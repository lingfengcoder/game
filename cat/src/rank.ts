
import Api from './api/api';
let ranks = [];
export default class Ranks {
    constructor() {
        console.log("Ranks");

    }

    static updateRanks(){
        this.updateFailRank();
        this.updateSuccessRank();
    }

    static updateSuccessRank() {
        Api.querySuccessRankApi({}).then((res: Array<Object>) => {
            try {
                console.log(res);
                ranks = res['all'];
                
                const selfRank = document.getElementById("successSelfRank") as HTMLInputElement;
                const _selfRank = res['self'];
                if (_selfRank!=undefined&& _selfRank !== null) {
                    selfRank.innerHTML = `【您当前排行: ${_selfRank + 1}】`;
                } else {
                    selfRank.innerHTML = `【您当前排行: 无】`;
                }

                const ranksUl = document.getElementById("ranksUl") as HTMLInputElement;
                ranksUl.innerHTML = "";
                let i = 0;
                let style = {};
                for (let item of ranks) {
                    let txt = "第 " + (i + 1) + " " + item['value'] + " 最少步数: " + item['score'];
                    if (i == 0) {
                        style = { color: "#dc2525" }
                    } else if (i == 1) {
                        style = { color: "#00dcff" }
                    } else if (i == 2) {
                        style = { color: "rgb(199, 169, 59)" }
                    } else {
                        txt = "第 " + (i + 1) + " <span style='color:#c9cada'>" + item['value'] + "</span> 最少步数: " + item['score'];
                        style = "";
                    }
                    Ranks.randerRanksTemplate(ranksUl, txt, style);
                    i++;
                }
            } catch (e) {
                console.log(e);
            }
        })
    }

    static updateFailRank() {
        Api.queryFailRankApi({}).then((res: Array<Object>) => {
            try {
                console.log(res);
                ranks = res['all'];
                const selfRank = document.getElementById("failSelfRank") as HTMLInputElement;
                const _selfRank = res['self'];
                if (_selfRank!=undefined&&_selfRank !== null) {
                    selfRank.innerHTML = `【您当前排行: ${_selfRank + 1}】`;
                } else {
                    selfRank.innerHTML = `【您当前排行: 无】`;
                }
                const ranksUl = document.getElementById("failRanksUl") as HTMLInputElement;
                ranksUl.innerHTML = "";
                let i = 0;
                let style = {};
                for (let item of ranks) {
                    let txt = "第 " + (i + 1) + " " + item['value'] + " 失败最多步数: " + item['score'];
                    if (i == 0 || i == 2 || i == 1) {
                        style = { color: "#000" }
                    } else {
                        txt = "第 " + (i + 1) + " <span style='color:#c9cada'>" + item['value'] + "</span> 失败最多步数: " + item['score'];
                        style = "";
                    }

                    Ranks.randerRanksTemplate(ranksUl, txt, style);
                    i++;
                }
            } catch (e) {
                console.log(e);
            }
        })
    }

    static randerRanksTemplate(fnode, text, style) {
        const node = document.createElement("li") as HTMLElement;
        node.style.setProperty("padding-top", "5px");
        if (style)
            for (let _s in style) {
                node.style.setProperty(_s, style[_s]);
            }
        node.innerHTML = text;
        //node.append(Node);
        fnode.appendChild(node);
    }

}