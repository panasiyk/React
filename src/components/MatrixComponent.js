import React, { Component } from 'react';
import Table from '../containers/Table.js';
import '../App.css';

class MatrixComponent extends Component{
    render (){
        return(
            <div>
                {this.props.initialDataForTable.isTableShowed?
                    <Table
                        initialDataForTable={this.props.initialDataForTable}
                        incomingData={this.props.incomingData}
                        increaseAmount={this.props.increaseAmount}
                        changeAverageBlock={this.props.changeAverageBlock}
                        changeSumBlock={this.props.changeSumBlock}
                        getObjectById={this.props.getObjectById}/>: null}

                {this.props.initialDataForTable.isAddTableShowed?
                    <button className="button" onClick={this.props.AddTable}>AddTable</button>: null}
                {this.props.initialDataForTable.isNewRowShowed?
                    <button className="button" onClick={this.props.AddNewRow}>AddNewRow</button>: null}
                {this.props.initialDataForTable.isDeleteRowShowed?
                    <button className="button" onClick={this.props.DeleteRow}>DeleteRow</button>: null}
            </div>
        );
    }
}
export default MatrixComponent;