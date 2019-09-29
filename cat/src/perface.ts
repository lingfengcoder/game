
import Api from './api/api';
import Ranks from './rank';
export default class Perface {
    constructor() {
        console.log("Perface");
        this.init();
        this.hiddenGame();
    }

    init() {
        //查询是否在线
        Api.queryOnlineNameApi().then(res => {
            console.log(res);
            if (res.name) {
                //this.setName(res.name);
                this.startGame();
            }
        });
        this.registerBtn();
        Ranks.updateSuccessRank();
        Ranks.updateFailRank();
    }

    setName(val) {
        let name = document.getElementById("name") as HTMLInputElement;
        name.value = val;
    }

    getName() {
        // let block = document.querySelectorAll(".block") as NodeListOf<HTMLElement>;
        let name = document.getElementById("name") as HTMLInputElement;
        return name.value;
    }

    hiddenLogin() {
        const _login = document.getElementById("login");
        const _loginBntn = document.getElementById("startGameBtn")
        if (!_login) return;
        _login.style.setProperty("display", "none");
        _loginBntn.style.setProperty("display", "none");
    }
    clearLogin() {
        let _name = document.getElementById("name") as HTMLInputElement;
        _name.value = "";
    }
    showLogin() {
        const _loginBntn = document.getElementById("startGameBtn")
        const _login = document.getElementById("login");
        if (!_login) return;
        _login.style.setProperty("display", "");
        _loginBntn.style.setProperty("display", "");
    }

    showLogout() {
        const _logout = document.getElementById("endGameBtn");
        const _reset = document.getElementById("restartBtn");
        if (!_logout) return;
        _logout.style.setProperty("display", "inline-block");
        _reset.style.setProperty("display", "inline-block");
    }

    hiddenLogout() {
        const _logout = document.getElementById("endGameBtn");
        const _reset = document.getElementById("restartBtn");
        if (!_logout) return;
        _logout.style.setProperty("display", "none");
        _reset.style.setProperty("display", "none");
    }

    hiddenGame() {
        const _game = document.getElementById("catch-the-cat");
        if (!_game) return;
        _game.style.setProperty("display", "none");
    }

    showGame() {
        const _game = document.getElementById("catch-the-cat");
        if (!_game) return;
        _game.style.setProperty("display", "");
    }

    registerBtn() {

        //cookie 
        console.log(document.cookie)

        //start btn
        const startGameBtn = document.getElementById("startGameBtn");
        startGameBtn.addEventListener("click", (e) => {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            let name = this.getName();
            if (name && name.trim()) {
                Api.loginApi({ name: name.trim() }).then(res => {
                    console.log(res);
                    if (res) {
                        this.startGame();
                    }
                });
               
            } else {
                alert("请输入姓名");
            }
        }, false);
        //end game 
        const endGameBtn = document.getElementById("endGameBtn");
        endGameBtn.addEventListener("click", (e) => {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            //退出
            Api.logoutApi();
            //更新排行榜
            Ranks.updateRanks();
            this.clearLogin();
            this.hiddenGame();
            this.hiddenLogout();
            this.showLogin();
        }, false);
        //reset
        const _resetBtn = document.getElementById("restartBtn");
        _resetBtn.addEventListener("click", (e) => {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            window['mainScene'].reset();
             //更新排行榜
             Ranks.updateRanks();
        }, false);

    }
    startGame() {
        this.hiddenLogin();
        this.showLogout();
        this.showGame();
         //更新排行榜
         Ranks.updateRanks();
    }


}