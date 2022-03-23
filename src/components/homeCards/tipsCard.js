import { h, render, Component } from "preact";
import Card from "../card";

export default class TipsCard extends Component {

    tips = ["Take the camera shutter off before taking pictures!", "Take your thumb away from the camera!", "Pay attention to depth of field!", "Use a tripod!", "Keep both eyes open!", "Watch out for magpies", "Wait for the golden hour!", "Take a walk", "Get 8 hours of sleep"];
    
    constructor(props) {
        super(props);

        // Sets a random tip from the array above
        this.setState({
            tip: this.tips[Math.floor(Math.random()*this.tips.length)]
        });
    }

    render() {
        return (
            <Card>
				<h3>Tip of the day!</h3>
                <span>{this.state.tip}</span>
			</Card>
        );
    }
}
