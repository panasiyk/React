import React, { Component } from 'react';
import MatrixComponent from '../components/MatrixComponent';

class Matrix extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayOfObjects:"",
            arrayForAverageBlock:"",
            arrayOfObjectsClone:"",
            arrayForSumBlock:"",
            isTableShowed: false,
            isAddTableShowed: true,
            isNewRowShowed: false,
            isDeleteRowShowed: false
        };
        this.increaseDataObjectAmount = this.increaseDataObjectAmount.bind(this);
        this.fillAverageArrayWithData = this.fillAverageArrayWithData.bind(this);
        this.fillSumBlockWithData = this.fillSumBlockWithData.bind(this);
        this.AddTable = this.AddTable.bind(this);
        this.AddNewRow = this.AddNewRow.bind(this);
        this.DeleteRow = this.DeleteRow.bind(this);
    }


    AddTable(){

        if((this.props.initialData.rowsCount!=="")&&
            (this.props.initialData.columnsCount!=="")&&
            (this.props.initialData.numberForIllumination!=="")){
            this.createMatrix();
            this.fillAverageArrayWithData();
            this.fillSumBlockWithData();
            this.setState({
                isAddTableShowed:false,
                isNewRowShowed:true,
                isDeleteRowShowed: true,
                isTableShowed: true});
        }

    }
    AddNewRow(){
        this.props.increaseRowCount();
        this.setState((prevState, props) => {
            prevState.arrayOfObjects[props.initialData.rowsCount-1]=[];
            for(let j=0; j<props.initialData.columnsCount; j++){
                prevState.arrayOfObjects[props.initialData.rowsCount-1][j]=Matrix.createDatObject();
            }
            return {
                arrayOfObjects:  prevState.arrayOfObjects
            };
        });
        this.fillSumBlockWithData();
        this.fillAverageArrayWithData();
        if(this.props.initialData.rowsCount>0){
            this.setState({isDeleteRowShowed:true});
        }

    }


    DeleteRow(){
        if(this.props.initialData.rowsCount>2){
            this.Delete();
        }
        else {
            this.Delete();
            this.setState({isDeleteRowShowed:false});
        }
    }
    Delete(){
        this.setState((prevState, props) => {
            prevState.arrayOfObjects.splice(props.initialData.rowsCount, 1);

            return {
                arrayOfObjects: prevState.arrayOfObjects
            };
        });
        this.props.reduceRowCount();
        this.fillSumBlockWithData();
        this.fillAverageArrayWithData();
    }
    createMatrix(){
        this.setState((prevState, props) => {
            let arrayOfObjectsBuffer=[];
            for(let i=0; i<props.initialData.rowsCount; i++){
                arrayOfObjectsBuffer[i]=[];
                for(let j=0; j<props.initialData.columnsCount; j++) {
                    arrayOfObjectsBuffer[i][j]=Matrix.createDatObject();
                }
            }

            return {
                arrayOfObjects: arrayOfObjectsBuffer,
            };
        });
    }

    fillAverageArrayWithData(){
        this.setState((prevState, props) => {
            let arrAverage=[];
            for (let i=0; i<props.initialData.columnsCount; i++){
                let sum=0;
                for(let j=0; j<props.initialData.rowsCount; j++){
                    sum += prevState.arrayOfObjects[j][i].amount;
                }
                arrAverage[i]=(parseInt((sum/props.initialData.rowsCount*10),10)/10);
            }

            return {
                arrayForAverageBlock: arrAverage,
            };
        });
    }


    fillSumBlockWithData(){

        this.setState((prevState, props) => {
            let arrSum=[];
            for (let i=0; i<props.initialData.rowsCount; i++){
                let sum=0;
                for(let j=0; j<props.initialData.columnsCount; j++){
                    sum += prevState.arrayOfObjects[i][j].amount;
                }
                arrSum[i]=sum;
            }

            return {
                arrayForSumBlock: arrSum
            };
        });
    }

    static createDatObject(){
        let obj = {amount: '', id: ''};
        obj.amount = Math.floor(Math.random()*(1000-100))+100;
        obj.id=Math.floor(Math.random()*100000000);
        return obj;
    }
    increaseDataObjectAmount(i,j){
        this.setState((prevState) => {
            let newIds = [...prevState.arrayOfObjects];
            newIds[i][j].amount++;
            return {arrayOfObjects: newIds};
        });
    }


    render() {
        return (
            <MatrixComponent initialDataForTable={this.state}
                             incomingData={this.props.initialData}
                             increaseAmount={this.increaseDataObjectAmount}
                             changeAverageBlock={this.fillAverageArrayWithData}
                             changeSumBlock={this.fillSumBlockWithData}
                             AddTable={this.AddTable}
                             AddNewRow={this.AddNewRow}
                             DeleteRow={this.DeleteRow}/>
        );
    }
}

export default Matrix;
