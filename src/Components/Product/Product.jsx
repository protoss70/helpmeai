import "./Product.css";
import icons from "../../icons";
import createNotif from '../Notification/notification';

function Product(props) {
    const fire = props.fire

    return (
    <div className="product-section">
        <div className="product-container">
            <div className="call-section">
                <div className="callHead">
                    <div className="callHeadImg"><img className="caller-img" src={icons.icons.user} alt="generic human image" /></div>
                    <div id="call-time">00:00</div>
                </div>
                <div className="connect">
                    <button className="btn btn-success hidden">Connect Call</button>
                </div>
                <div className="call-buttons ">
                    <button className="btn btn-secondary">Send to Volontaire</button>
                    <button className="btn btn-secondary">Send to Operator</button>
                    <div className="section-btn"><img className="caller-hang" src={icons.icons.hang} alt="hang up button" /></div>
                </div>
            </div>
            <div className="report-section">
                <div className="report-sections">
                    <div className="report-sec report-sec-active"><h6>Live Report </h6><span id="liveIcon"></span></div>
                    <div className="report-sec report-sec-last"><h6>Transcript</h6></div>
                </div>
                <div className="report">
                    <div className="report-text">
                        <h5>Key Phrases</h5>
                        <div className="keys">Depression, Lack of Coffee</div>
                        <h5>Summary</h5>
                        <div className="text">Feels as he needs coffee and without it, gets deeply depressed</div>
                    </div>
                    <div className="report-risk-level">
                        <div className="risk-bubble high"></div>
                        <h6 className="riskLevelText">Risk Level</h6>
                        <div className="risk-text">Low</div>
                    </div>
                </div>
                <div className="transcript">

                </div>
            </div>
        </div>        
    </div>
    );
 }
  
  export default Product;