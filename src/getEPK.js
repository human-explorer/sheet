import React, { Component } from 'react'
import './App.css';
import './table.css';
class GetEPK extends Component{
    constructor(props){
        super(props);
        this.state = {
            // Price
            epkPrice: 0,
            updateTimer: 0,
            // Sheet
            mp: 0,
            workers: 0,
            minepower: [100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000],
            planets: ["Stone Age I","Stone Age II","Stone Age III","Stone Age IV","Stone Age V","Stone Age VI","Agricultural Age I","Agricultural Age II","Agricultural Age III","Agricultural Age IV","Agricultural Age V","Agricultural Age VI","Iron Age I","Iron Age II","Iron Age II","Iron Age IV","Iron Age V","Iron Age VI","Industrial Age I","Industrial Age II","Industrial Age III","Industrial Age IV","Industrial Age V","Industrial Age VI","Information Age I","Information Age II","Information Age III","Information Age IV","Information Age V","Information Age VI"],
            oracle_adjustment: [1.000,2.019,3.078,4.176,5.315,6.516,7.754,9.033,10.372,11.751,14.429,16.208,18.085,20.083,22.163,24.341,26.659,29.076,31.614,34.292,45.863,49.939,54.016,59.112,64.149,69.304,74.400,80.336,86.529,93.765],
            d_success_chance: [0.85,0.83,0.81,0.79,0.77,0.75,0.73,0.71,0.69,0.67,0.6,0.58,0.56,0.54,0.52,0.50,0.48,0.46,0.44,0.42,0.41,0.41,0.41,0.41,0.41,0.39,0.39,0.39,0.39,0.39],
            c_success_chance: [0.88,0.86,0.84,0.82,0.8,0.78,0.76,0.74,0.72,0.70,0.65,0.63,0.61,0.59,0.57,0.55,0.53,0.51,0.49,0.47,0.43,0.43,0.43,0.43,0.43,0.40,0.40,0.40,0.40,0.40],
            b_success_chance: [0.91,0.89,0.87,0.85,0.83,0.81,0.79,0.77,0.75,0.73,0.67,0.65,0.63,0.61,0.59,0.57,0.55,0.53,0.51,0.49,0.47,0.47,0.47,0.47,0.47,0.45,0.45,0.45,0.45,0.45],
            a_success_chance: [0.93,0.91,0.89,0.87,0.85,0.83,0.81,0.79,0.77,0.75,0.71,0.69,0.67,0.65,0.63,0.61,0.59,0.57,0.55,0.53,0.52,0.52,0.52,0.52,0.52,0.50,0.50,0.50,0.50,0.50],
            s_success_chance: [0.97,0.95,0.93,0.91,0.89,0.87,0.85,0.83,0.81,0.79,0.74,0.72,0.70,0.68,0.66,0.64,0.62,0.60,0.58,0.56,0.55,0.55,0.55,0.55,0.55,0.53,0.53,0.53,0.53,0.53],
            fleet_rank: "D",
            fleet_level: 0,
            rank_reward: [1,1.01,1.02,1.03,1.04,1.05,1.1,1.12,1.14,1.16,1.20,1.205,1.21,1.215,1.22,1.225,1.25,1.255,1.26,1.265,1.27,1.3,1.305,1.31,1.315,1.35],
            fuel: [21,43,66,90,114,140,167,195,224,254,311,350,390,434,479,526,576,628,683,741,950,1000,1050,1100,1400,1500,1600,1750,1900,2100],
            // UI
            visibilityNormal: "",
            visibilityFleet:"",
            inputVisFleet: "",
            sheetInfo: "",
            visInfo: "",
            visCredits: "",
            btnHighlightInfo: "btn btn-custom mobile-margin",
            btnHighlightFleet: "btn stretch mobile-margin",
            showFixedHeader: "d-none",
            // UI
            selectDays: "7",
            currency: "USD",
            currencySymbol: "$",
            errorMP: "Not Enough SP",
            averageWorkers: 0,
            rewardSwitch: "epk",
            contractSwitch: "epk",
            // Language
            visLangSelect: "EN",
            visEn: "",
            visThai: "d-none",
            visESP: "d-none",
            visGER: "d-none",
            visPER: "d-none",
            visINDO: "d-none",
            visGREEK: "d-none",
            visBRPT: "d-none",
            visFR: "d-none",
            visITA: "d-none",
            visZHtr: "d-none",
            visZHsm: "d-none"
        }
        this.setMP = this.setMP.bind(this);
        this.setWorkers = this.setWorkers.bind(this);
        this.setFleetLevel = this.setFleetLevel.bind(this);
        this.setFleetRank = this.setFleetRank.bind(this);
    }

    async loadData(){
        const url = "https://api.pancakeswap.info/api/v2/tokens/0x87ecea8512516ced5db9375c63c23a0846c73a57"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({epkPrice: data["data"]["price"]})
    }

    async componentDidMount() {
        this.loadData()
        this.updateTimer = setInterval(() => this.loadData(), 5000);
    }

    async componentWillUnmount() {
        clearInterval(this.updateTimer);
    }
    // Headers UI
    
    setMP(event){
        this.setState({mp : event.target.value})
    }
    setWorkers(event){
        this.setState({workers: event.target.value})
    }
    setFleetRank(event){
        this.setState({fleet_rank: event.target.value})
    }
    setFleetLevel(event){
        this.setState({fleet_level: event.target.value})
    }
    getAverageWorkers(){
        if (this.state.workers === 0){
            return "Input # of Workers"
        } else if (isNaN(parseFloat(this.state.mp / this.state.workers).toFixed(2))){
            return "Input MP"
        } else if (parseFloat(this.state.mp / this.state.workers).toFixed(2) === "Infinity"){
            return "Input # of Workers not 0"
        } else {
            return parseFloat(this.state.mp / this.state.workers).toFixed(2)
        }
    }

    // UI
    setDays = (event) => {
        this.setState({ selectDays: event.target.value });
      };
    setFleetRank = (event) => {
        this.setState({ fleet_rank: event.target.value });
      };
    setRewardSwitch = (event) => {
        this.setState({ rewardSwitch: event.target.value });
      };
    setContractSwitch = (event) => {
        this.setState({ contractSwitch: event.target.value });
      };
    //
    getETLvsCurrency(){
        return parseFloat(this.state.epkPrice).toFixed(2)
    }
    getMinePower(i){
        return this.state.minepower[i]
    }
    getMineUSDETL(i){
        return parseFloat(4.0 * this.state.oracle_adjustment[i]).toFixed(2)
    }
    getFleetMineETL(i){
        return parseFloat((this.getFleetMineUSDETL(i)/this.state.epkPrice)).toFixed(4)
    }
    getFleetMineUSDETL(i){
        return parseFloat( (this.getMineUSDETL(i) * (this.state.rank_reward[this.state.fleet_level]))).toFixed(2)
    }
    getMineUSD(i){
        return parseFloat(4.0 * this.state.oracle_adjustment[i]).toFixed(4)
    }
    getFleetMineUSD(i){
        return parseFloat( (this.getMineUSD(i) * (this.state.rank_reward[this.state.fleet_level]))).toFixed(2)
    }
    //Printing
    getFleetMineUSDM(i){
        return parseFloat( (this.getMineUSD(i) * (this.state.rank_reward[this.state.fleet_level]))).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }
    getFleetSRvsUSD(i){
        if (this.state.fleet_rank === ""){
            return 'Enter Fleet Rank'
        } 
        else if (isNaN(parseFloat(this.getFleetMineUSD(i)* this.state.selectDays * this.getFleetSuccessChance(i) / 100).toFixed(2))) {
            return this.state.errorMP
        }
        else {
            return this.state.currencySymbol+parseFloat(this.getFleetMineUSD(i)* this.state.selectDays * this.getFleetSuccessChance(i) / 100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        }
    }

    //Contracts
    getContractCost(){
        if (this.state.selectDays === "30"){
            return parseFloat(27/this.state.epkPrice).toFixed(4)
        } else if (this.state.selectDays === "15"){
            return parseFloat(14/this.state.epkPrice).toFixed(4)
        } 
        else if (this.state.selectDays === "7"){
            return parseFloat(7/this.state.epkPrice).toFixed(4)
        }
    }
    getContractDays(){
        if (this.state.selectDays === "30"){
            return 27
        } else if (this.state.selectDays === "15"){
            return 14
        } else if (this.state.selectDays === "7"){
            return 7
        }
    }
    getWorkersUSD(){
        return this.state.workers*this.getContractDays()
    }
    getFleetContractCostETL(){
        return parseFloat(((this.getContractDays()*this.state.workers)/this.state.epkPrice)).toFixed(4)
    }
    getFleetContractCostUSD(){
        return parseFloat(this.getContractDays()*this.state.workers).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }

    //Net Profit
    getFleetNet(i){
        if (this.state.fleet_rank === ""){
            return 'Enter Fleet Rank'
        }
        else if (isNaN(parseFloat(((this.getFleetMineUSD(i)*this.state.selectDays) * (this.getFleetSuccessChance(i)/100)) - this.getWorkersUSD() ).toFixed(2))){
            return this.state.errorMP
        } else {
            return this.state.currencySymbol+parseFloat(((this.getFleetMineUSD(i)*this.state.selectDays) * (this.getFleetSuccessChance(i)/100)) - this.getWorkersUSD()).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        }
    }
    getFleetNetFuel(i){
        if (this.state.fleet_rank === ""){
            return 'Enter Fleet Rank'
        }
        else if (isNaN(parseFloat(((this.getFleetMineUSD(i)*this.state.selectDays) * (this.getFleetSuccessChance(i)/100)) - this.getWorkersUSD() - (this.getFuel(i)*this.state.selectDays) ).toFixed(2))){
            return this.state.errorMP
        }
        else {
            return this.state.currencySymbol+parseFloat(((this.getFleetMineUSD(i)*this.state.selectDays) * (this.getFleetSuccessChance(i)/100)) - this.getWorkersUSD() - (this.getFuel(i)*this.state.selectDays) ).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        }
    }

    //Fuel
    getFuel(i){
        return parseFloat((this.state.fuel[i]/100)).toFixed(2)
    }
    //Pretty Print
    getFuelM(i){
        return parseFloat((this.state.fuel[i]/100)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }


    // Success Chance Selector
    getFleetSuccessChance(i){
        if (this.state.fleet_rank === "D" || this.state.fleet_rank === "d" ) {
            return this.getFleetDSR(i)
        } else if (this.state.fleet_rank === "C" || this.state.fleet_rank === "c" ) {
            return this.getFleetCSR(i)
        } else if (this.state.fleet_rank === "B" || this.state.fleet_rank === "b" ) {
            return this.getFleetBSR(i)
        } else if (this.state.fleet_rank === "A" || this.state.fleet_rank === "a" ){
            return this.getFleetASR(i)
        } else if (this.state.fleet_rank === "S" || this.state.fleet_rank === "s" ){
            return this.getFleetSSR(i)
        }   
    }
    //Pretty Print
    getFleetSuccessChanceM(i){
        if (this.state.fleet_rank === "D" || this.state.fleet_rank === "d" ) {
            return this.getFleetDSRM(i)
        } else if (this.state.fleet_rank === "C" || this.state.fleet_rank === "c" ) {
            return this.getFleetCSRM(i)
        } else if (this.state.fleet_rank === "B" || this.state.fleet_rank === "b" ) {
            return this.getFleetBSRM(i)
        } else if (this.state.fleet_rank === "A" || this.state.fleet_rank === "a" ){
            return this.getFleetASRM(i)
        } else if (this.state.fleet_rank === "S" || this.state.fleet_rank === "s" ){
            return this.getFleetSSRM(i)
        }   
    }

    //Base Success Rates
    getFleetDSR(i){
        if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.d_success_chance[i] * 100 + divi).toFixed(0);
            if (i < 10){
                if (answer >= 88){
                return 88
                } else {
                    return answer
                }
            }
            else if (answer > 88){
                return 88
            } else if ( answer < 39 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough SP'
            } else {
                return answer
            }
        } else if (this.state.mp < 1500) {
            if (this.state.mp < 100){
                return parseFloat(this.state.d_success_chance[i] * 100).toFixed(0)
            } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough SP'
            }
            else {
                return parseFloat(this.state.d_success_chance[i] * 100).toFixed(0)
            }
        }
    }
    getFleetDSRM(i){
        if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.d_success_chance[i] * 100 + divi).toFixed(0);
            if (i < 10){
                if (answer >= 88){
                return 88+'%'
                } else {
                    return answer+'%'
                }
            }
            else if (answer > 88){
                return 88+'%'
            } else if ( answer < 39 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            if (this.state.mp < 100){
                return parseFloat(this.state.d_success_chance[i] * 100).toFixed(0)+'%'
            } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            }
            else {
                return parseFloat(this.state.d_success_chance[i] * 100).toFixed(0)+'%'
            }
        }
    }

    getFleetCSR(i){
        if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.c_success_chance[i] * 100 + divi).toFixed(0);
            if (i < 10){
                if (answer >= 97){
                return 97
                } else {
                    return answer
                }
            }
            else if (answer >= 88){
                return 88
            } else if ( answer < 40 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough SP'
            } else {
                return answer
            }
        } else if (this.state.mp < 1500) {
            if (this.state.mp < 100){
                return parseFloat(this.state.c_success_chance[i] * 100).toFixed(0)
            } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough SP'
            }
            else {
                return parseFloat(this.state.c_success_chance[i] * 100).toFixed(0)
            }
        }
    }
    getFleetCSRM(i){
        if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.c_success_chance[i] * 100 + divi).toFixed(0);
            if (i < 10){
                if (answer >= 97){
                return 97+'%'
                } else {
                    return answer+'%'
                }
            }
            else if (answer >= 88){
                return 88+'%'
            } else if ( answer < 40 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            if (this.state.mp < 100){
                return parseFloat(this.state.c_success_chance[i] * 100).toFixed(0)+'%'
            } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            }
            else {
                return parseFloat(this.state.c_success_chance[i] * 100).toFixed(0)+'%'
            }
        }
    }

    getFleetBSR(i){
        if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.b_success_chance[i] * 100 + divi).toFixed(0);
            if (i < 10){
                if (answer >= 97){
                return 97
                } else {
                    return answer
                }
            }
            else if (answer > 88){
                return 88
            } else if ( answer < 45 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough SP'
            } else {
                return answer
            }

        } else if (this.state.mp < 1500) {
            if (this.state.mp < 100){
                return parseFloat(this.state.b_success_chance[i] * 100).toFixed(0)
            } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough SP'
            }
            else {
                return parseFloat(this.state.b_success_chance[i] * 100).toFixed(0)
            }
        }
    }
    getFleetBSRM(i){
        if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.b_success_chance[i] * 100 + divi).toFixed(0);
            if (i < 10){
                if (answer >= 97){
                return 97+'%'
                } else {
                    return answer+'%'
                }
            }
            else if (answer > 88){
                return 88+'%'
            } else if ( answer < 45 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            } else {
                return answer+'%'
            }

        } else if (this.state.mp < 1500) {
            if (this.state.mp < 100){
                return parseFloat(this.state.b_success_chance[i] * 100).toFixed(0)+'%'
            } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            }
            else {
                return parseFloat(this.state.b_success_chance[i] * 100).toFixed(0)+'%'
            }
        }
    }

    getFleetASR(i){
        if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.a_success_chance[i] * 100 + divi).toFixed(0);
            if (answer >= 97 && i < 17){
                return 97
            }  else if (answer >= 90 && i > 15 && i < 25){
                if (i===17) {
                    return 95
                } else if (i===18){
                    return 93
                } else if (i===19){
                    return 91
                } else {
                    return 90
                }
            } else if (answer >= 88 && i > 24 && i < 30){
                return 88
            } else if ( answer < 50 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough SP'
            } else {
                return answer
            }
        } 
            else if (this.state.mp < 1500) {
                if (this.state.mp < 100){
                    return parseFloat(this.state.a_success_chance[i] * 100).toFixed(0)
                } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                    return 'Not Enough SP'
                }
                else {
                    return parseFloat(this.state.a_success_chance[i] * 100).toFixed(0)
                }
            }
    }
    getFleetASRM(i){
        if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.a_success_chance[i] * 100 + divi).toFixed(0);
            if (answer >= 97 && i < 17){
                return 97+'%'
            }  else if (answer >= 90 && i > 15 && i < 25){
                if (i===17) {
                    return 95+'%'
                } else if (i===18){
                    return 93+'%'
                } else if (i===19){
                    return 91+'%'
                } else {
                    return 90+'%'
                }
            } else if (answer >= 88 && i > 24 && i < 30){
                return 88+'%'
            } else if ( answer < 50 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            if (this.state.mp < 100){
                return parseFloat(this.state.a_success_chance[i] * 100).toFixed(0)+'%'
            } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            }
            else {
                return parseFloat(this.state.a_success_chance[i] * 100).toFixed(0)+'%'
            }
        }
    }
    getFleetSSR(i){
        if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.s_success_chance[i] * 100 + divi).toFixed(0);
            if (answer >= 91 && i < 20){
                return 97
            }  else if (answer >= 93 && i > 19 && i < 25){
                return 93
            } else if (answer >= 91 && i > 24 && i < 30){
                return 91
            } else if ( answer < 53 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough SP'
            } else {
                return answer
            }
        } else if (this.state.mp < 1500) {
            if (this.state.mp < 100){
                return parseFloat(this.state.s_success_chance[i] * 100).toFixed(0)
            } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return 'Not Enough SP'
            }
            else {
                return parseFloat(this.state.s_success_chance[i] * 100).toFixed(0)
            }
        }
    }
    getFleetSSRM(i){
    if (this.state.mp > 1499) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.s_success_chance[i] * 100 + divi).toFixed(0);
            if (answer >= 91 && i < 20){
                return 97+'%'
            }  else if (answer >= 93 && i > 19 && i < 25){
                return 93+'%'
            } else if (answer >= 91 && i > 24 && i < 30){
                return 91+'%'
            } else if ( answer < 53 || (Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            if (this.state.mp < 100){
                return parseFloat(this.state.s_success_chance[i] * 100).toFixed(0)+'%'
            } else if ((Math.floor(this.state.mp/100)*100) < this.state.minepower[i]){
                return this.state.errorMP
            }
            else {
                return parseFloat(this.state.s_success_chance[i] * 100).toFixed(0)+'%'
            }
        }
    }

    render(){
        return(
            <div class="container-fixed px-3">
                <div class="container-fluid px-1">
                    <div class="container-fluid">

                        <div class="d-none d-lg-block px-0 mx-0">
                            <div class="row"> 


                                <div class="col-12">

                                <div class={this.state.visEn+" row d-flex sm-flex align-items-start border border-2 border-dark"}> 
                                    <div class="col-4 row">
                                        <div class="col-1"></div>
                                        <div class="col-11 mt-3 ml-0 pl-0">
                                            <p class="getEternalHeader"><b>USD / EPK</b> -{'>'} <span class="text-primary">{parseFloat(this.state.epkPrice).toFixed(4)}</span></p>
                                        </div>
                                    </div>
                                    <div class="row col-4">
                                        <div class="col-1"></div>
                                        <div class="col-3"><select class="form-select getEternalHeader select-days" onChange={this.setDays} aria-label="Default select">
                                        <option selected value="7">7 Days</option>
                                        <option value="15">15 Days</option>
                                        <option value="30">30 Days</option>
                                        </select></div>
                                        <div class="col-8 mt-3"><p class="getEternalHeaderL"><b>Contract / Explorer</b> -{'>'} <span class="text-primary">{this.getContractCost()} EPK</span> </p></div>
                                    </div>
                                    <div class="col-4 row">
                                        <div class="col-6"></div>
                                        <div class="col-6"><p class="getEternalHeader text-left-TRUE mt-3 ml-0 pl-0"> <b>Minting</b> -{'>'} <span class="text-primary">{parseFloat(20/this.state.epkPrice).toFixed(4)} EPK</span> </p></div>
                                    </div>
                                </div>
                                </div>

                            </div>
                            
                        </div>
                        {/* Mobile View */}
                        <div class="d-xs-block d-sm-none px-0 mx-0">
                            <div class="row d-flex sm-flex align-items-start border border-2 border-dark"> 
                                <p class="col-4 getEternalHeaderM mt-3"> <b>USD/EPK</b>:<br/>  <span class="text-primary">{parseFloat(this.state.epkPrice).toFixed(2)}</span></p>
                                <p class="col-4 getEternalHeaderM mt-3"> <b>Contract 7d: </b><br/> <span class="text-primary">{this.getContractCost()} EPK</span> </p>
                                <p class="col-4 getEternalHeaderM mt-3"> <b>Minting</b>: <br/><span class="text-primary">{parseFloat(20/this.state.epkPrice).toFixed(4)} EPK</span> </p>
                            </div>
                        </div>
                    </div>

                    <div class="contrainer-fluid">
                        <div class="my-3 row">
                            <div class="row d-none d-lg-block px-0 mx-0">

                                <div class="row px-0 mx-0">
                                <div class="col-2"></div>

                                <div class={this.state.inputVisFleet+" col-8 row"+this.state.visEn}>

                                    <div class="col-2 pt-2">
                                        <p class="text-left">MP:</p>
                                    </div>
                                    <div class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setMP}></input>
                                    </div>
                                    <div class="col-2 pt-2">
                                        <p class="text-left">Explorers:</p>
                                    </div>
                                    <div class="col-2">
                                        <input type="number" class="input-group-text" onChange={this.setWorkers}></input>
                                    </div>

                                    <div class="col-4 pt-2 text-left-x"></div>

                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2 pt-2">
                                        <p class="text-left">Brigade Rank:</p>
                                    </div>
                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetRank} aria-label="Fleet Select">
                                    <option selected value="D">D Rank</option>
                                    <option value="C">C Rank</option>
                                    <option value="B">B Rank</option>
                                    <option value="A">A Rank</option>
                                    <option value="S">S Rank</option>
                                    </select>
                                    </div>
                                    <div class="col-2 pt-2">
                                        <p class="text-left">Brigade Level:</p>
                                    </div>
                                    <div class="col-2">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetLevel} aria-label="Fleet Select">
                                    <option selected value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="23">24</option>
                                    <option value="25">25</option>
                                    </select>
                                    </div>
                                </div>

                                <div class="col-2"></div>
                                </div>
                            </div>

                            <div class="d-xs-block d-sm-none px-0 mx-0">
                                <div class={this.state.inputVisFleet+" col-12 pt-2 px-0 mx-0 row"}>
                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-4 pt-2">
                                        <p class="text-left-M">SP:</p>
                                    </div>
                                    <div title="MP affects Success Rate (SR) past 1500MP" class="col-8">
                                        <input type="number" class="input-group-text" onChange={this.setMP}></input>
                                    </div>
                                    <div class="col-12 my-1"><p class="text-small">SP affects Success Rate (SR)</p></div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-4 pt-2">
                                        <p class="text-left-M">Explorers:</p>
                                    </div>
                                    <div title="Workers affect Contract Upkeep and Net Profit" class="col-8">
                                        <input type="number" class="input-group-text" onChange={this.setWorkers}></input>
                                    </div>
                                    <div class="col-12 my-1"><p class="text-small">Explorers affect Contract Upkeep and Net Profit</p></div>
                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-4 pt-2">
                                        <p class="text-left-M">Brigade Rank:</p>
                                    </div>
                                    <div title="Fleet Ranks are: D, C, B, A, and S" class="col-8">
                                        <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetRank} aria-label="Fleet Select">
                                        <option selected value="D">D Rank</option>
                                        <option value="C">C Rank</option>
                                        <option value="B">B Rank</option>
                                        <option value="A">A Rank</option>
                                        <option value="S">S Rank</option>
                                        </select>
                                    </div>
                                    <div class="col-12 my-1"><p class="text-small">Brigade Ranks are: D, C, B, A, and S</p></div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-4 pt-2">
                                        <p class="text-left-M">Brigade Level:</p>
                                    </div>
                                    <div title="Fleet Levels are 0 to 25, they increase rewards earned. Default is 0" class="col-8">
                                    <select class="form-select fleet-rank-custom input-group-text text-middle" onChange={this.setFleetLevel} aria-label="Fleet Select">
                                    <option selected value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="23">24</option>
                                    <option value="25">25</option>
                                    </select>
                                    </div>
                                    <div class="col-12 my-1"><p class="text-small">Brigade Levels are 0 to 25, they increase rewards earned. Default is 0.</p></div>
                                </div>

                            </div>
                        </div>
                    </div>
                        <div id="fleet" class={this.state.visibilityFleet + " overflow"}>

                            <table>
                                <tr class={this.state.visEn+" border border-dark"}>
                                    <th class="border border-2 border-dark">#</th>
                                    <th class="border extra-padding border-2 border-dark">Era</th>
                                    <th class="border border-2 border-dark">SP</th>
                                    <th class="border border-2 border-dark">Multiplier</th>
                                    <th class="border border-2 border-dark">Travel Reward (EPK)</th>
                                    <th class="border border-2 border-dark">Travel Reward ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Food Cost ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Success Rate (SR)</th>
                                    <th class="border border-2 border-dark">{this.state.selectDays}d Reward ({this.state.currency}) * SR</th>
                                    <th class="border border-2 border-dark">Contract / {this.state.selectDays}d (EPK)</th>
                                    <th class="border border-2 border-dark">Contract / {this.state.selectDays}d ({this.state.currency})</th>
                                    <th class="border border-2 border-dark">Net Profit / {this.state.selectDays}d</th>
                                    <th class="border border-2 border-dark">Net Profit - Food / {this.state.selectDays}d</th>
                                </tr>
                                
                                {/* Fleet */}
                                {(() => {
                                    const print = [];
                                    for (let i=0; i<30; i++){
                                        print.push(
                                            <tr>
                                                <td class="border border-secondary">{i+1}</td>
                                                <td class="border border-secondary">{this.state.planets[i]}</td>
                                                <td class="border border-secondary purp">{this.getMinePower(i)}</td>
                                                <td class="border border-secondary gray">{parseFloat(this.state.oracle_adjustment[i]).toFixed(3)}</td>
                                                <td class="border border-secondary text-primary">{this.getFleetMineETL(i)} EPK</td>
                                                <td class="border border-secondary">{this.state.currencySymbol}{this.getFleetMineUSDM(i)}</td>
                                                <td class="border border-secondary">{this.state.currencySymbol}{this.getFuelM(i)}</td>
                                                <td class="border border-secondary text-secondary"><b>{this.getFleetSuccessChanceM(i)}</b></td>
                                                <td class="border border-secondary">{this.getFleetSRvsUSD(i)}</td>
                                                <td class="border border-secondary text-primary">{this.getFleetContractCostETL()} EPK</td>
                                                <td class="border border-secondary">{this.state.currencySymbol}{this.getFleetContractCostUSD()}</td>
                                                <td class="border border-secondary" title="New tax system deductions for P21-P30">{this.getFleetNet(i)}</td>
                                                <td class="border border-secondary" title="New tax system deductions for P21-P30">{this.getFleetNetFuel(i)}</td>
                                            </tr>
                                        )
                                    }
                                    return print
                                })()}
                            </table>


                        </div>
                        <div class="d-none d-lg-block px-0 mx-0">
                            <div class={this.state.visCredits}>
                                <div class="row align-items-start mt-6">
                                    
                                    <div class="col-6">
                                        <p class="disclaimer">
                                        Disclaimer: 
                                        <br/>Multiplier is based on observation and not actual value (unless the devs gives us the Data).
                                        <br/>
                                        All values are approximation and should only be used as a template. 
                                        <br/>
                                        EPK/USD updates are from PancakeSwap API.
                                        <br/>
                                        Mobile View is available.
                                        </p>
                                        
                                    </div>
                                    <div class="col-6">
                                        <p class="credits text-info">
                                        <br/>
                                        Found bugs? Want to help? DM me directly in Discord: Jucci#0007
                                        <br/>
                                        If you found this sheet helpful: <button class="btn text-size-12 text-info px-0 mx-0 mb-0 py-0" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Copied!" onClick={() => {navigator.clipboard.writeText("0x1e206BD3B8253AEa904353f89bbE67f122Fbc149")}}>0x1e206BD3B8253AEa904353f89bbE67f122Fbc149</button> 
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div class="d-xs-block d-sm-none px-0 mx-0">
                            
                            <div class={this.state.visCredits}>
                                <div class="row mt-2">
                                <div class="col-12">
                                    
                                    <p class="disclaimer1">
                                    Disclaimer: 
                                    <br/>Multiplier is based on observation and not actual value (unless the devs gives us the Data).
                                    <br/>
                                    All values are approximation and should only be used as a template. 
                                    <br/>
                                    EPK/USD updates are from PancakeSwap API.
                                    <br/>
                                    Mobile View is available.
                                    </p>
                                </div>
                                <div class="col-12">
                                    <p class="credits1 text-info">
                                    <br/>
                                    Found bugs? Want to help? DM me directly in Discord: Jucci#0007
                                    <br/>
                                    If you found this sheet helpful: <button class="btn text-size-12 text-info px-0 mx-0 mb-0 py-0" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Copied!" onClick={() => {navigator.clipboard.writeText("0x1e206BD3B8253AEa904353f89bbE67f122Fbc149")}}>0x1e206BD3B8253AEa904353f89bbE67f122Fbc149</button> 
                                    </p>
                                </div>
                                        
                                </div>
                                
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}
export default GetEPK
