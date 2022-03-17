//DELETE ME WHEN DONE

import { h, render, Component } from "preact";
import { route } from "preact-router";
import Card from "../components/card";
import style from "./style.less";

export class TestPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class={style.app}>
                I am page {this.props.pageNum}

                <button onClick={() => { route(`/subpage/${this.props.pageNum}`)}}>Go To Subpage with router</button>
            </div>
        );
    }

}

export class TestSubPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class={style.app}>
                <p>You are in subpage {this.props.pageNum} :)</p>
                <button onClick={() => { history.go(-1);}}>Go Back</button>
            </div>
        );
    }
}