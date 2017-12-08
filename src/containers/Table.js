import React, { Component } from 'react';
import TableComponent from '../components/TableComponent';

import '../App.css';

class Table extends Component{
    arrayOfElementForIllumination;
    numberForIllumination = parseInt(this.props.incomingData.numberForIllumination);

    constructor(props) {
        super(props);
        this.state={
            rowIndexHover:-1,
            flag: false
        };
        this.onCellClick = this.onCellClick.bind(this);
        this.onMouseOverSumBlock = this.onMouseOverSumBlock.bind(this);
        this.illuminationTable = this.illuminationTable.bind(this);
        this.onMouseOverCell = this.onMouseOverCell.bind(this);
        this.onMouseOutCell = this.onMouseOutCell.bind(this);
        this.onMouseOutSumBlock = this.onMouseOutSumBlock.bind(this);
        this.getPercent = this.getPercent.bind(this);
    }

    onCellClick(event,i,j){
        this.props.increaseAmount(i,j);
        this.onMouseOutCell(event);
        this.onMouseOverCell(event,i,j);
        this.props.changeAverageBlock();
        this.props.changeSumBlock();

    }
    onMouseOverCell(event,i,j){
        this.findNearestElementInArray(i,j);
        this.setState({flag: true});
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
        let a = index+this.numberForIllumination+1;
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
        let ElementForIllumination = [];
        let givenElement = this.props.initialDataForTable.arrayOfObjects[i][j];
        let lenerArrayOfObjects = this.props.initialDataForTable.arrayOfObjects.reduce((sum, elem) => sum.concat(elem));
        lenerArrayOfObjects = lenerArrayOfObjects.sort((prev, curr) => prev.amount - curr.amount);
        let index = lenerArrayOfObjects.findIndex(item => item.id === givenElement.id);
        lenerArrayOfObjects = lenerArrayOfObjects.slice(this.findRightNumberStart(index),this.findRightNumberEnd(index));
        this.deleteFromArray(lenerArrayOfObjects,givenElement.id);
        while(ElementForIllumination.length !== this.numberForIllumination){
            let nearestElement = lenerArrayOfObjects.reduce((prev, curr) =>
                (Math.abs(curr.amount - givenElement.amount) < Math.abs(prev.amount - givenElement.amount) ? curr : prev)
            );
            ElementForIllumination.push(nearestElement.id);
            this.deleteFromArray(lenerArrayOfObjects,nearestElement.id);
        }
        this.arrayOfElementForIllumination=[...ElementForIllumination];
        console.timeEnd("you");

        // console.time("you");
        // let arrayOfObjectsElement = this.props.initialDataForTable.arrayOfObjects[i][j];
        // let minDiff=1000;
        // let result;
        // let resultID;
        // let arrayOfElementForIllumination=[];
        //     while(arrayOfElementForIllumination.length != this.props.incomingData.numberForIllumination){
        //         this.props.initialDataForTable.arrayOfObjects.map((row) =>{
        //             row.map((element) => {
        //                  if ((arrayOfElementForIllumination.indexOf(element.id) === -1) && (arrayOfObjectsElement.id !== element.id )) {
        //                      let min = Math.abs(arrayOfObjectsElement.amount - element.amount);
        //                      if (min <= minDiff) {
        //                          minDiff = min;
        //                          result = element.amount;
        //                          resultID = element.id;
        //                      }
        //                  }
        //              });
        //         });
        //         arrayOfElementForIllumination.push(resultID);
        //         minDiff=1000;
        //     }
        //     this.arrayOfElementForIllumination=[...arrayOfElementForIllumination];
        //     console.timeEnd("you");
    }


    onMouseOutCell(){
        this.setState({flag: false});
    }
    onMouseOverSumBlock(event,i){
        this.setState({rowIndexHover:i});
    }

    onMouseOutSumBlock(event){
        this.setState({rowIndexHover:-1});

    }

    getPercent(i,j){
        return (i===this.state.rowIndexHover) ?
            ((this.props.initialDataForTable.arrayOfObjects[i][j].amount/
                this.props.initialDataForTable.arrayForSumBlock[i])* 100).toFixed(2) + "%" :
            this.props.initialDataForTable.arrayOfObjects[i][j].amount
    }
    illuminationTable(i, j){
        return (this.state.flag)? this.illuminationNearest(i,j) :this.illuminationPercent(i,j)
    }

    illuminationNearest(i, j){
        let isElinArray = this.arrayOfElementForIllumination.find((element)=>{
            if (this.props.initialDataForTable.arrayOfObjects[i][j].id!== element) return false;
            return element;
        });
        if(isElinArray !== undefined){return 'linear-gradient(to right, #e50b2f 100%, #e50b2f 0%)';}
    }

    illuminationPercent(i, j){
        if (i===this.state.rowIndexHover){
            return( ' linear-gradient(to right, #e50b2f '+((this.props.initialDataForTable.arrayOfObjects[i][j].amount/
                this.props.initialDataForTable.arrayForSumBlock[i])* 100).toFixed(2)+'%, #AFCDE7 0%)')
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