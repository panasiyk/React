import React, { Component } from 'react';
import TableComponent from '../components/TableComponent';

import '../App.css';

class Table extends Component{
    arrayOfElementForIllumination;
    arrayOfColorsForillumination = [];
    numberForIllumination = parseInt(this.props.incomingData.numberForIllumination);
    cache = [];

    constructor(props) {
        super(props);
        this.state={
            rowIndexHover:-1,
            flag: false
        };
        this.createArrayOfColorsForillumination();

        this.onCellClick = this.onCellClick.bind(this);
        this.onMouseOverSumBlock = this.onMouseOverSumBlock.bind(this);
        this.onMouseOverCell = this.onMouseOverCell.bind(this);
        this.onMouseOutCell = this.onMouseOutCell.bind(this);
        this.getPercent = this.getPercent.bind(this);
    }
    createArrayOfColorsForillumination() {
        for (let i = 0; i < this.props.incomingData.columnsCount; i++) {
            this.arrayOfColorsForillumination[i] = [];
            for (let j = 0; j < this.props.incomingData.rowsCount; j++) {
                this.arrayOfColorsForillumination[i][j] = '';
            }
        }
    }

    componentWillReceiveProps(nexProps){
        let row = [];
        for (let i = 0; i < this.props.incomingData.rowsCount; i++) {
            row[i] = '';
        }
        this.arrayOfColorsForillumination.push(row);
    }

    onCellClick(event,i,j){
        this.props.increaseAmount(i,j);
        this.onMouseOverCell(event,i,j);
        this.props.changeAverageBlock();
        this.props.changeSumBlock();

    }
    onMouseOverCell(event,i,j){
        this.findNearestElementInArray(i,j);
        this.fillingArrayOfColorsForillumination();
        this.setState({flag: true,rowIndexHover:-1});
    }

    findRightNumberStart(index){
        if((index-this.numberForIllumination)<0){
            return 0
        }
        return index-this.numberForIllumination;
    }

    findRightNumberEnd(index){
        if((index+this.numberForIllumination)>(this.props.incomingData.rowsCount*this.props.incomingData.columnsCount)){
            return (this.props.incomingData.rowsCount*this.props.incomingData.columnsCount+1)
        }
        return index+this.numberForIllumination+1
    }
    deleteFromArray(lenerArrayOfObjects, id){
        for(let i = 0; i <lenerArrayOfObjects.length; i++){
            if(lenerArrayOfObjects[i].id === id){
                lenerArrayOfObjects.splice(i,1);
                break;
            }
        }
    };

    findNearestElementInArray(i,j) {
        console.time("you");
        this.arrayOfElementForIllumination=[];
        let givenElement = this.props.initialDataForTable.arrayOfObjects[i][j];

        let lenerArrayOfObjects = this.props.initialDataForTable.arrayOfObjects.reduce((sum, elem) => sum.concat(elem));
        lenerArrayOfObjects = lenerArrayOfObjects.sort((prev, curr) => prev.amount - curr.amount);
        let index = lenerArrayOfObjects.findIndex(item => item.id === givenElement.id);
        lenerArrayOfObjects = lenerArrayOfObjects.slice(this.findRightNumberStart(index),this.findRightNumberEnd(index));
        this.deleteFromArray(lenerArrayOfObjects,givenElement.id);

        while(this.arrayOfElementForIllumination.length !== this.numberForIllumination){
            let nearestElement = lenerArrayOfObjects.reduce((prev, curr) =>
                (Math.abs(curr.amount - givenElement.amount) < Math.abs(prev.amount - givenElement.amount) ? curr : prev)
            );
            this.arrayOfElementForIllumination.push(nearestElement.id);
            this.deleteFromArray(lenerArrayOfObjects,nearestElement.id);
        }
        console.timeEnd("you");
    }

    fillingArrayOfColorsForillumination(){
        for(let i=0; i<this.props.initialDataForTable.arrayOfObjects.length; i++){
            let c = false;
            for(let j=0; j<this.props.initialDataForTable.arrayOfObjects[i].length; j++) {



                let isElinArray = this.arrayOfElementForIllumination.find((element)=>{
                    if (this.props.initialDataForTable.arrayOfObjects[i][j].id!== element) return false;
                    return element;
                });

                // if(isElinArray !== undefined){this.arrayOfColorsForillumination[i][j] = '#e50b2f';}
                // else{this.arrayOfColorsForillumination[i][j] = ''}

                if(isElinArray !== undefined){
                    if(this.arrayOfColorsForillumination[i][j]!=='#e50b2f'){
                        this.arrayOfColorsForillumination[i][j]='#e50b2f';
                        c = true;
                    }
                }
                else{
                    if(this.arrayOfColorsForillumination[i][j]!==''){
                        this.arrayOfColorsForillumination[i][j]='';
                        c = true;
                    }
                }

            }
            this.cache[i] = c;
        }
    }



    onMouseOutCell(){
        this.takeBackColor();
        this.setState({flag: false,rowIndexHover:-1});
    }
    takeBackColor(){
        for(let i=0; i<this.props.initialDataForTable.arrayOfObjects.length; i++){
            for(let j=0; j<this.props.initialDataForTable.arrayOfObjects[i].length; j++) {
                this.arrayOfColorsForillumination[i][j] = ''
            }
        }
    }


    fillingArrayOfColorsForPercentillumination(rowIndexHover) {
        for (let i = 0; i < this.props.initialDataForTable.arrayOfObjects.length; i++) {
            if (i === rowIndexHover) {
                for (let j = 0; j < this.props.initialDataForTable.arrayOfObjects[i].length; j++) {
                    this.arrayOfColorsForillumination[i][j] = ' linear-gradient(to right, #e50b2f ' + ((this.props.initialDataForTable.arrayOfObjects[i][j].amount /
                        this.props.initialDataForTable.arrayForSumBlock[i]) * 100).toFixed(2) + '%, #AFCDE7 0%)'
                }
                break;
            }
        }
    }

    onMouseOverSumBlock(event,rowIndexHover){
        this.takeBackColor();
        this.fillingArrayOfColorsForPercentillumination(rowIndexHover);
        this.setState({rowIndexHover:rowIndexHover});
    }
    getPercent(i,j){
        return (i===this.state.rowIndexHover) ?
            ((this.props.initialDataForTable.arrayOfObjects[i][j].amount/
                this.props.initialDataForTable.arrayForSumBlock[i])* 100).toFixed(2) + "%" :
            this.props.initialDataForTable.arrayOfObjects[i][j].amount
    }
    render (){
        return(
            <TableComponent initialDataForTable={this.props.initialDataForTable}
                           onCellClick={this.onCellClick}
                           onMouseOverCell={this.onMouseOverCell}
                           getPercent={this.getPercent}
                           onMouseOverSumBlock={this.onMouseOverSumBlock}
                           onMouseOutCell={this.onMouseOutCell}
                           arrayOfColorsForillumination={this.arrayOfColorsForillumination}
                            cache={this.cache}/>
        );
    }


}
export default Table;