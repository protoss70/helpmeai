import axios from "axios";

const helpMe = {}

helpMe.start = async () => {
    return await axios.post("http://127.0.0.1:8000/start");
}

helpMe.accumulate = async (data) => {
    return await axios.post("http://127.0.0.1:8000/accumulate", data)
}

helpMe.process = async () => {
    return await axios.post("http://127.0.0.1:8000/process");
}

helpMe.transcript = async () => {
    return await axios.post("http://127.0.0.1:8000/transcript")
}

export default helpMe;