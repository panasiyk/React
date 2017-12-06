import React, { Component } from 'react';
import AppComponent from '../components/AppComponent';
import '../App.css';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            rowsCount: "10",
            columnsCount: "10" ,
            numberForIllumination: "10"
        };

        this.onChangeInput = this.onChangeInput.bind(this);
        this.columnsCount = this.columnsCount.bind(this);
        this.numberForIllumination = this.numberForIllumination.bind(this);
        this.reduceRowCount = this.reduceRowCount.bind(this);
        this.increaseRowCount = this.increaseRowCount.bind(this);
    }
    onChangeInput(e) {
        let reg = new RegExp(/[0-9]/);

        if (reg.test(e.target.value)) {
            switch(e.target.name) {
                case 'rows':
                    this.rowsCount(e);
                    break;

                case 'columns':
                    this.columnsCount(e);
                    break;

                case 'Illumination':
                    this.numberForIllumination(e);
                    break;

            }
        } else {
            e.target.style.backgroundColor = "#F08080";
        }

    }
    rowsCount(e){
        this.setState({rowsCount: e.target.value});
    }
    columnsCount(e){
        this.setState({columnsCount: e.target.value});
    }
    numberForIllumination(e){
        this.setState({numberForIllumination: e.target.value});
    }
    increaseRowCount(){
        this.setState((prevState) => {
            return {rowsCount: ++prevState.rowsCount};
        });
    }
    reduceRowCount(){
        this.setState((prevState) => {
            return {rowsCount: --prevState.rowsCount};
        });
    }

    render (){
        return(
            <AppComponent onChangeInput={this.onChangeInput}
                          initialData={this.state}
                          increaseRowCount={this.increaseRowCount}
                          reduceRowCount={this.reduceRowCount}/>

        );
    }
}
export default App;