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
        this.getDataObjectById = this.getDataObjectById.bind(this);
        this.AddTable = this.AddTable.bind(this);
        this.AddNewRow = this.AddNewRow.bind(this);
        this.DeleteRow = this.DeleteRow.bind(this);
    }


    AddTable(){
        if((this.props.initialData.rowsCount!=="")&&
            (this.props.initialData.columnsCount!=="")&&
            (this.props.initialData.numberForIllumination!=="")){
            this.setState({
                isAddTableShowed:false,
                isNewRowShowed:true,
                isDeleteRowShowed: true});
            this.createMatrix();
            this.fillAverageArrayWithData();
            this.fillSumBlockWithData();
            this.createTable();
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

    createTable(){
        this.setState({isTableShowed: true});
    }
    static createDatObject(){
        let obj = {amount: '', id: ''};
        obj.amount = Math.floor(Math.random()*(1000-100))+100;
        obj.id=Math.floor(Math.random()*100000);
        return obj;
    }
    increaseDataObjectAmount(id){
        let obj = this.getDataObjectById(id);
        let a= this.state.arrayOfObjects;
        a[obj]=obj.amount++;
        this.setState({arrayOfObjects: a});
    }

    getDataObjectById (id){
        let result="";
        for( let i=0; i<this.props.initialData.rowsCount; i++){
            for(let j=0; j<this.props.initialData.columnsCount; j++){
                if(this.state.arrayOfObjects[i][j].id==id){
                    result=this.state.arrayOfObjects[i][j];
                }
            }
        }
        return result;
    };

    render() {
        return (
            <MatrixComponent initialDataForTable={this.state}
                             incomingData={this.props.initialData}
                             increaseAmount={this.increaseDataObjectAmount}
                             changeAverageBlock={this.fillAverageArrayWithData}
                             changeSumBlock={this.fillSumBlockWithData}
                             getObjectById={this.getDataObjectById}
                             AddTable={this.AddTable}
                             AddNewRow={this.AddNewRow}
                             DeleteRow={this.DeleteRow}/>
        );
    }
}

export default Matrix;
