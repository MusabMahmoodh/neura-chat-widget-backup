import React, { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Loader, Environment, useFBX, useAnimations, OrthographicCamera } from "@react-three/drei";
import { MeshStandardMaterial } from "three/src/materials/MeshStandardMaterial";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { LinearEncoding, sRGBEncoding } from "three/src/constants";
import { LineBasicMaterial, MeshPhysicalMaterial, Vector2 } from "three";
import ReactAudioPlayer from "react-audio-player";

import createAnimation from "./converter";
import blinkData from "./blendDataBlink.json";
import "./styles.scss";
import * as THREE from "three";
import axios from "axios";
import { useMessage } from "../../useMessage";
import { useUserData } from "../../useUserData";
import AvatarMic from "./AvatarMic";
import AvatarResponseProcess from "./AvatarResponseProcess";
import AvatarListeningProcess from "./AvatarListeningProcess";
import ErrorModal from "../ErrorModal/ErrorModal";
import { AVATR_BE, BOT } from "../../constants";
import SideBar from "./SideBar";
import { replacePythonCodeWithText } from "../../utils/textUtils";
import ErrorScreen from "../ErrorScreen/ErrorScreen";
import DemoSclSelect from "../DemoSclSelect/DemoSclSelect";
import { getBot } from "../../messageService";
import WeekSelect from "../WeekSelect/WeekSelect";
const _ = require("lodash");

const host = AVATR_BE;

function Avatar({ setTextToShow, avatar_url, speak, setSpeak, text, setAudioSource, playing }) {
  let gltf = useGLTF(avatar_url);
  let morphTargetDictionaryBody = null;
  let morphTargetDictionaryLowerTeeth = null;

  const [
    bodyTexture,
    eyesTexture,
    teethTexture,
    bodySpecularTexture,
    bodyRoughnessTexture,
    bodyNormalTexture,
    teethNormalTexture,
    // teethSpecularTexture,
    hairTexture,
    tshirtDiffuseTexture,
    tshirtNormalTexture,
    tshirtRoughnessTexture,
    hairAlphaTexture,
    hairNormalTexture,
    hairRoughnessTexture,
  ] = useTexture([
    "/images/body.webp",
    "/images/eyes.webp",
    "/images/teeth_diffuse.webp",
    "/images/body_specular.webp",
    "/images/body_roughness.webp",
    "/images/body_normal.webp",
    "/images/teeth_normal.webp",
    // "/images/teeth_specular.webp",
    "/images/h_color.webp",
    "/images/tshirt_diffuse.webp",
    "/images/tshirt_normal.webp",
    "/images/tshirt_roughness.webp",
    "/images/h_alpha.webp",
    "/images/h_normal.webp",
    "/images/h_roughness.webp",
  ]);

  _.each(
    [
      bodyTexture,
      eyesTexture,
      teethTexture,
      teethNormalTexture,
      bodySpecularTexture,
      bodyRoughnessTexture,
      bodyNormalTexture,
      tshirtDiffuseTexture,
      tshirtNormalTexture,
      tshirtRoughnessTexture,
      hairAlphaTexture,
      hairNormalTexture,
      hairRoughnessTexture,
    ],
    (t) => {
      t.encoding = sRGBEncoding;
      t.flipY = false;
    }
  );

  bodyNormalTexture.encoding = LinearEncoding;
  tshirtNormalTexture.encoding = LinearEncoding;
  teethNormalTexture.encoding = LinearEncoding;
  hairNormalTexture.encoding = LinearEncoding;

  gltf.scene.traverse((node) => {
    if (node.type === "Mesh" || node.type === "LineSegments" || node.type === "SkinnedMesh") {
      node.castShadow = true;
      node.receiveShadow = true;
      node.frustumCulled = false;

      if (node.name.includes("Body")) {
        node.castShadow = true;
        node.receiveShadow = true;

        node.material = new MeshPhysicalMaterial();
        node.material.map = bodyTexture;
        // node.material.shininess = 60;
        node.material.roughness = 1.7;

        // node.material.specularMap = bodySpecularTexture;
        node.material.roughnessMap = bodyRoughnessTexture;
        node.material.normalMap = bodyNormalTexture;
        node.material.normalScale = new Vector2(0.6, 0.6);

        morphTargetDictionaryBody = node.morphTargetDictionary;

        node.material.envMapIntensity = 0.8;
        // node.material.visible = false;
      }

      if (node.name.includes("Eyes")) {
        node.material = new MeshStandardMaterial();
        node.material.map = eyesTexture;
        // node.material.shininess = 100;
        node.material.roughness = 0.1;
        node.material.envMapIntensity = 0.5;
      }

      if (node.name.includes("Brows")) {
        node.material = new LineBasicMaterial({ color: 0x000000 });
        node.material.linewidth = 1;
        node.material.opacity = 0.5;
        node.material.transparent = true;
        node.visible = false;
      }

      if (node.name.includes("Teeth")) {
        node.receiveShadow = true;
        node.castShadow = true;
        node.material = new MeshStandardMaterial();
        node.material.roughness = 0.1;
        node.material.map = teethTexture;
        node.material.normalMap = teethNormalTexture;

        node.material.envMapIntensity = 0.7;
      }

      if (node.name.includes("Hair")) {
        node.material = new MeshStandardMaterial();
        node.material.map = hairTexture;
        node.material.alphaMap = hairAlphaTexture;
        node.material.normalMap = hairNormalTexture;
        node.material.roughnessMap = hairRoughnessTexture;

        node.material.transparent = true;
        node.material.depthWrite = false;
        node.material.side = 2;
        node.material.color.setHex(0x000000);

        node.material.envMapIntensity = 0.3;
      }

      if (node.name.includes("TSHIRT")) {
        node.material = new MeshStandardMaterial();

        node.material.map = tshirtDiffuseTexture;
        node.material.roughnessMap = tshirtRoughnessTexture;
        node.material.normalMap = tshirtNormalTexture;
        node.material.color.setHex(0xffffff);

        node.material.envMapIntensity = 0.5;
      }

      if (node.name.includes("TeethLower")) {
        morphTargetDictionaryLowerTeeth = node.morphTargetDictionary;
      }
    }
  });

  const [clips, setClips] = useState([]);
  const mixer = useMemo(() => new THREE.AnimationMixer(gltf.scene), [gltf.scene]);

  useEffect(() => {
    if (speak === false) return;
    const textWithoutPythonMarkDown = replacePythonCodeWithText(text);
    makeSpeech(textWithoutPythonMarkDown)
      .then((response) => {
        setTextToShow(text);
        let { blendData, filename } = response.data;

        let newClips = [
          createAnimation(blendData, morphTargetDictionaryBody, "HG_Body"),
          createAnimation(blendData, morphTargetDictionaryLowerTeeth, "HG_TeethLower"),
        ];

        filename = host + filename;

        setClips(newClips);
        setAudioSource(filename);
      })
      .catch((err) => {
        console.error(err);
        setSpeak(false);
      });
    // .finally(() => {
    //   setIsThinking(false);
    // });
  }, [
    setTextToShow,
    speak,
    morphTargetDictionaryBody,
    morphTargetDictionaryLowerTeeth,
    setAudioSource,
    setSpeak,
    text,
  ]);

  useEffect(() => {
    if (speak === false) {
      setClips([]);
      mixer.stopAllAction();
      setAudioSource(null);
      window.speechSynthesis.cancel();
    }
  }, [speak, mixer, setAudioSource]);

  let idleFbx = useFBX("/idle.fbx");
  let { clips: idleClips } = useAnimations(idleFbx.animations);

  idleClips[0].tracks = _.filter(idleClips[0].tracks, (track) => {
    return track.name.includes("Head") || track.name.includes("Neck") || track.name.includes("Spine2");
  });

  idleClips[0].tracks = _.map(idleClips[0].tracks, (track) => {
    if (track.name.includes("Head")) {
      track.name = "head.quaternion";
    }

    if (track.name.includes("Neck")) {
      track.name = "neck.quaternion";
    }

    if (track.name.includes("Spine")) {
      track.name = "spine2.quaternion";
    }

    return track;
  });

  useEffect(() => {
    let idleClipAction = mixer.clipAction(idleClips[0]);
    idleClipAction.play();

    let blinkClip = createAnimation(blinkData, morphTargetDictionaryBody, "HG_Body");
    let blinkAction = mixer.clipAction(blinkClip);
    blinkAction.play();
  }, [idleClips, mixer, morphTargetDictionaryBody]);

  // Play animation clips when available
  useEffect(() => {
    if (playing === false) return;
    _.each(clips, (clip) => {
      let clipAction = mixer.clipAction(clip);
      clipAction.setLoop(THREE.LoopOnce);
      clipAction.play();
    });
  }, [playing, clips, mixer]);

  useFrame((state, delta) => {
    mixer.update(delta);
  });

  return (
    <group name="avatar">
      <primitive object={gltf.scene} dispose={null} />
    </group>
  );
}

function makeSpeech(text) {
  return axios.post(host + "/talk", { text });
}

const STYLES = {
  wrapper: { position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#000000" },
  area: { position: "absolute", width: "100%", bottom: "0", zIndex: 500 },
  anims: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "200px",
  },
  stopBtn: {
    padding: "10px",

    display: "block",
    color: "#FFFFFF",
    background: "#222222",
    border: "None",
    cursor: "pointer",
    borderRadius: "5px",
    width: "200px",
    margin: "auto",
    textAlign: "center",
    marginTop: "-20px",
    zIndex: "9999",
    marginBottom: "5px",
  },

  text: {
    margin: "0px",
    width: "300px",
    padding: "5px",
    background: "none",
    color: "#ffffff",
    fontSize: "1.2em",
    border: "none",
  },
  speak: {
    padding: "10px",
    marginTop: "5px",
    display: "block",
    color: "#FFFFFF",
    background: "#222222",
    border: "None",
  },
  area2: { position: "absolute", top: "5px", right: "15px", zIndex: 500 },
  label: { color: "#777777", fontSize: "0.8em" },
};

function TalkingAvatar() {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const {
    messages,
    getApiResponse,
    isSpeakerOn,
    markMessageAsRead,
    isError,
    isLimitReached,
    sendMessage,
    sclOption,
    addSclOption,
    updateWeek,
    week,
  } = useMessage();
  const { userData } = useUserData();
  const agent = userData.agent;

  const [isReplying, setIsReplying] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const [textToShow, setTextToShow] = useState(messages[messages.length - 1].message);

  // ************
  const audioPlayer = useRef();

  const [speak, setSpeak] = useState(false);
  const [text, setText] = useState(
    "My name is Arwen. I'm a virtual human who can speak whatever you type here along with realistic facial movements."
  );
  const [audioSource, setAudioSource] = useState(null);
  const [playing, setPlaying] = useState(false);

  // End of play
  function playerEnded(e) {
    setAudioSource(null);
    setSpeak(false);
    setPlaying(false);
  }

  // Player is read
  function playerReady(e) {
    audioPlayer.current.audioEl.current.play();
    setPlaying(true);
  }

  useEffect(() => {
    const listen = async () => {
      if (!listening) {
        setIsReplying(false);
        setIsThinking(true);
        SpeechRecognition.stopListening();
        if (transcript.trim() !== "") {
          await getApiResponse(transcript);
        }
        setIsThinking(false);
        resetTranscript();
      } else {
        console.log("listening", listening);
      }
    };
    listen();

    setInterval(() => {
      if (window.speechSynthesis.speaking) {
        setIsReplying(true);
      } else {
        setIsReplying(false);
      }
    }, 500);
    // eslint-disable-next-line
  }, [listening]);
  useEffect(() => {
    // only generate voice for remote messages
    const talk = async () => {
      if (
        messages.length > 1 &&
        messages[messages.length - 1].sender === "remote" &&
        messages[messages.length - 1].isRead === false
      ) {
        setIsThinking(false);
        setIsReplying(true);
        setText(messages[messages.length - 1].message);
        setTextToShow("");
        markMessageAsRead(messages[messages.length - 1]._id);
        // if  messages.length === 1 then wait for 2 seconds
        if (messages.length === 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        setSpeak(true);
      }
    };
    talk();
  }, [messages, isSpeakerOn, agent, markMessageAsRead]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <ErrorScreen
        subMessage="But you can continue with text chat"
        message="Browser doesn't support speech recognition"
      />
    );
  }

  const stopSpeaking = () => {
    setSpeak(false);
    setAudioSource(null);
    audioPlayer.current.audioEl.current.pause();
    setPlaying(false);
  };

  if (isLimitReached && isLimitReached != null && isLimitReached?.message) {
    return <ErrorScreen message={isLimitReached.message} />;
  }

  const bot = getBot();
  return (
    <div style={STYLES.wrapper}>
      <SideBar message={textToShow} />
      {bot === BOT.DEMO_SCL && (
        <div className="widget-container-chat-week-select">
          <DemoSclSelect sendMessage={sendMessage} onUpdate={addSclOption} value={sclOption} />
        </div>
      )}
      {bot === BOT.AIEYE && (
        <div className="widget-container-chat-week-select">
          <WeekSelect sendMessage={sendMessage} onUpdate={updateWeek} value={week} />
        </div>
      )}
      {isError && <ErrorModal />}
      <div style={STYLES.area}>
        {!speak ? (
          <div style={STYLES.anims}>
            {!isThinking && !isReplying && listening ? (
              <div>
                <AvatarListeningProcess />
              </div>
            ) : isThinking && !isReplying ? (
              <AvatarResponseProcess />
            ) : !isThinking && isReplying ? (
              <>
                <AvatarResponseProcess />
              </>
            ) : (
              <>
                <div onClick={SpeechRecognition.startListening}>
                  <AvatarMic />
                </div>
              </>
            )}
          </div>
        ) : (
          <div style={STYLES.anims}>
            <AvatarResponseProcess />
          </div>
        )}
        {speak && (
          <div style={STYLES.stopBtn} onClick={stopSpeaking}>
            Stop Speaking
          </div>
        )}
      </div>

      <ReactAudioPlayer src={audioSource} ref={audioPlayer} onEnded={playerEnded} onCanPlayThrough={playerReady} />

      {/* <Stats /> */}
      <Canvas
        dpr={2}
        onCreated={(ctx) => {
          ctx.gl.physicallyCorrectLights = true;
        }}
      >
        <OrthographicCamera makeDefault zoom={2000} position={[0, 1.65, 1]} />

        {/* <OrbitControls
        target={[0, 1.65, 0]}
      /> */}

        <Suspense fallback={null}>
          <Environment background={false} files="/images/photo_studio_loft_hall_1k.hdr" />
        </Suspense>

        <Suspense fallback={null}>
          <Bg />
        </Suspense>

        <Suspense fallback={null}>
          <Avatar
            avatar_url="/model.glb"
            speak={speak}
            setSpeak={setSpeak}
            text={text}
            setAudioSource={setAudioSource}
            playing={playing}
            setIsReplying={setIsReplying}
            setTextToShow={setTextToShow}
          />
        </Suspense>
      </Canvas>
      <Loader dataInterpolation={(p) => `Loading... please wait`} />
    </div>
  );
}

function Bg() {
  const texture = useTexture("/images/bg.webp");

  return (
    <mesh position={[0, 1.5, -2]} scale={[0.9, 0.9, 0.9]}>
      <planeBufferGeometry />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

export default TalkingAvatar;
