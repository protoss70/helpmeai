import "./Product.css";
import icons from "../../icons";
import createNotif from '../Notification/notification';
import {startRecording, stopRecording, playBack, turnToWav} from "./sound";
import { useState } from "react";
import { stopTimer, resetTimer, startTimer } from "./timer";
import helpMe from "../../api/helpme";

function Product(props) {
    const fire = props.fire
    var firstCall = false;

    const [keyP, setKeyP] = useState("");
    const [summary, setSummary] = useState("");
    const [risk, setRisk] = useState("None");
    const [transcript, setTransrict] = useState("");

    var process = false;

    function toggleReport(e){
        if (e === "l"){
            document.getElementById("report").classList.remove("hidden");
            document.getElementById("trans").classList.add("hidden");
            document.getElementById("liveRep").classList.add("report-sec-active");
            document.getElementById("transcriptt").classList.remove("report-sec-active");
        }else{
            document.getElementById("report").classList.add("hidden");
            document.getElementById("trans").classList.remove("hidden");
            document.getElementById("liveRep").classList.remove("report-sec-active");
            document.getElementById("transcriptt").classList.add("report-sec-active");
        }
    }

    async function serverProcess(){
        async function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        if (!firstCall){
            await sleep(3_000)
        }else{
            await sleep(5_000)
        }

        stopRecording();
        await sleep(500);
        const wav = playBack();
        sleep(500).then(() => {
            startRecording();
        })
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        var url = window.URL.createObjectURL(wav);
        a.href = url;
        a.download = "blobFile";
        a.click();
        window.URL.revokeObjectURL(url);

        await helpMe.accumulate();

        helpMe.process().then(e => {
            setSummary(e.data.summary);
            setKeyP(e.data.keyphrases);
            setRisk(e.data.risk_level);
            setTransrict(e.data.transcript);

            document.getElementById("risk-bubble").classList.remove("high");
            document.getElementById("risk-bubble").classList.remove("low");
            document.getElementById("risk-bubble").classList.remove("medium");
            document.getElementById("risk-bubble").classList.add(e.data.risk_level);

            if (process){
                serverProcess();
            }
        })
    }

    async function connectButton(e){
        await helpMe.start();
        process = true;
        startRecording();
        serverProcess();
        firstCall = true
        createNotif({mode: "success", title: "Connected", text: "Connected to the server!"});
        document.getElementById("call-buttons").classList.remove("hidden");
        e.target.classList.add("hidden");
        startTimer(document.getElementById("call-time"));
        document.getElementById("liveIcon").classList.remove("hidden");
    }

    function hangButton(){
        firstCall = false;
        process = false;
        resetTimer(document.getElementById("call-time"));
        stopTimer();
        stopRecording();
        document.getElementById("liveIcon").classList.add("hidden");
        document.getElementById("call-time").textContent = "Call Ended";
        document.getElementById("connect-call-button").classList.remove("hidden");
        document.getElementById("call-buttons").classList.add("hidden");

    }
    
    return (
    <div className="product-section">
        <div className="product-container">
            <div className="call-section">
                <div className="callHead">
                    <div className="callHeadImg"><img className="caller-img" src={icons.icons.user} alt="generic human image" /></div>
                    <div id="call-time">00:00</div>
                </div>
                <div className="connect">
                    <button className="btn btn-success" id="connect-call-button" onClick={connectButton}>Connect Call</button>
                </div>
                <div className="call-buttons hidden" id="call-buttons">
                    <button className="btn btn-secondary">Send to Volontaire</button>
                    <button className="btn btn-secondary">Send to Operator</button>
                    <div className="section-btn" onClick={hangButton}><img className="caller-hang" src={icons.icons.hang} alt="hang up button" /></div>
                </div>
            </div>
            <div className="report-section">
                <div className="report-sections">
                    <div className="report-sec report-sec-active" id="liveRep" onClick={() => {toggleReport("l")}}><h6>Live Report </h6><span id="liveIcon"></span></div>
                    <div className="report-sec report-sec-last" id="transcriptt" onClick={() => {toggleReport("t")}}><h6>Transcript</h6></div>
                </div>
                <div className="report" id="report">
                    <div className="report-text">
                        <h5>Key Phrases</h5>
                        <div className="keys">{keyP}</div>
                        <h5>Summary</h5>
                        <div className="text">{summary}</div>
                    </div>
                    <div className="report-risk-level">
                        <div className="risk-bubble" id="risk-bubble"></div>
                        <h6 className="riskLevelText">Risk Level</h6>
                        <div className="risk-text">{risk}</div>
                    </div>
                </div>
                <div className="transcript">
                    <div className="report hidden" id="trans">
                        {transcript}
                    </div>
                </div>
            </div>
        </div>        
    </div>
    );
 }
  
  export default Product;