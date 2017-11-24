import React, { Component } from 'react';
import TableComponent from '../components/TableComponent';
import '../App.css';

class Table extends Component{
    arrayOfObjectsClone;
    arrayOfIdIlluminationOfElements;
    arrayOfElementForIllumination;

    constructor(props) {
        super(props);
        this.state={
            rowIndexHover:-1,
            flag: false
        };
        this.createCloneArray();
        this.onCellClick = this.onCellClick.bind(this);
        this.onMouseOverSumBlock = this.onMouseOverSumBlock.bind(this);
        this.illuminationTable = this.illuminationTable.bind(this);
        this.onCellClick = this.onCellClick.bind(this);
        this.onMouseOverCell = this.onMouseOverCell.bind(this);
        this.onMouseOutCell = this.onMouseOutCell.bind(this);
        this.onMouseOutSumBlock = this.onMouseOutSumBlock.bind(this);
        this.getPercent = this.getPercent.bind(this);
    }

    componentWillReceiveProps(newProps){
        this.createCloneArray(newProps);
    }

    onCellClick(event){
        let id = event.target.id;
        this.props.increaseAmount(id);
        this.onMouseOutCell(event);
        this.onMouseOverCell(event);
        this.props.changeAverageBlock();
        this.props.changeSumBlock();

    }
    onMouseOverCell(event){
        let obj = this.props.getObjectById(event.target.id);
        this.deleteAmountFromArray(obj.id);
        this.findNearestElementInArray(obj.amount);
        this.createCloneArray();
        this.deleteAmountFromArray(obj.id);
        this.createTableIdArrayForIdIllumination();
        this.setState({flag: true});
    }

    deleteAmountFromArray(id) {
        for(let i = 0; i <this.props.incomingData.rowsCount*this.props.incomingData.columnsCount; i++){
            if (this.arrayOfObjectsClone[i].id == id) {
                this.arrayOfObjectsClone.splice(i, 1);
                break;
            }
        }
    }

    findNearestElementInArray(amount) {
        let i=0;
        let minDiff=1000;
        let result;
        let resultID;
        this.arrayOfElementForIllumination=[];
        if(this.props.incomingData.numberForIllumination<this.arrayOfObjectsClone.length){
            while(this.arrayOfElementForIllumination.length!=this.props.incomingData.numberForIllumination){
                for(i in this.arrayOfObjectsClone){
                    let min = Math.abs(amount - this.arrayOfObjectsClone[i].amount);
                    if (min <= minDiff) {
                        minDiff = min;
                        result = this.arrayOfObjectsClone[i].amount;
                        resultID = this.arrayOfObjectsClone[i].id;
                    }
                }
                this.arrayOfElementForIllumination.push(result);
                this.deleteAmountFromArray(resultID);
                minDiff=1000;
            }
        }
    }


    createCloneArray(newProps) {
        this.arrayOfObjectsClone=[];
        newProps=newProps || this.props;
        for(let i=0; i<newProps.incomingData.rowsCount; i++){
            for(let j=0; j<newProps.incomingData.columnsCount; j++){
                this.arrayOfObjectsClone.push(this.props.initialDataForTable.arrayOfObjects[i][j])
            }
        }
    }

    createTableIdArrayForIdIllumination() {
        this.arrayOfIdIlluminationOfElements=[];
        let k=0;
        for (let h=0; h<=this.props.incomingData.numberForIllumination; h++){
            for(let i = 0; i <this.props.incomingData.rowsCount*this.props.incomingData.columnsCount-1; i++){
                if (this.arrayOfObjectsClone[i].amount == this.arrayOfElementForIllumination[k]) {
                    this.arrayOfIdIlluminationOfElements.push(this.arrayOfObjectsClone[i].id);
                    k++;
                }
            }
        }
    }

    onMouseOutCell(){
        this.createCloneArray();
        this.setState({flag: false});

    }
    onMouseOverSumBlock(event,i){
        this.setState({rowIndexHover:i});
    }

    onMouseOutSumBlock(event){
        this.setState({rowIndexHover:-1});

    }

    getPercent(i,j,Data){
        return (i===this.state.rowIndexHover) ?
            ((Data.arrayOfObjects[i][j].amount/Data.arrayForSumBlock[i])* 100).toFixed(2) + "%" :
            Data.arrayOfObjects[i][j].amount
    }
    illuminationTable(i, j, Data){
        return (this.state.flag)? this.illuminationNearest(i,j,Data) :this.illuminationPercent(i,j,Data)
    }

    illuminationPercent(i, j, Data){
        return (i===this.state.rowIndexHover) ?
            ' linear-gradient(to right, #e50b2f '+((Data.arrayOfObjects[i][j].amount/
            Data.arrayForSumBlock[i])* 100).toFixed(2)+'%, #AFCDE7 0%)'  :  ''
    }
    illuminationNearest(i, j, Data){
        for (let k = 0; k < this.arrayOfIdIlluminationOfElements.length; k++) {
            if(Data.arrayOfObjects[i][j].id == this.arrayOfIdIlluminationOfElements[k]){
                return 'linear-gradient(to right, #e50b2f 100%, #e50b2f 0%)';}
        }

    }

    render (){
        return(
            <TableComponent initialDataForTable={this.props.initialDataForTable}
                            illuminationTable={this.illuminationTable}
                            onCellClick={this.onCellClick}
                            onMouseOverCell={this.onMouseOverCell}
                            getPercent={this.getPercent}
                            onMouseOverSumBlock={this.onMouseOverSumBlock}
                            onMouseOutSumBlock={this.onMouseOutSumBlock}
                            onMouseOutCell={this.onMouseOutCell}/>
        );
    }


}
export default Table;