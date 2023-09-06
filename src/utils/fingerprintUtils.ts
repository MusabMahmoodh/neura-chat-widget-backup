import { ClientJS } from "clientjs";
const client = new ClientJS();
const fingerprint = client.getFingerprint();
export default fingerprint;
