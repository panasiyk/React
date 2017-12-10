import React, { PureComponent } from 'react';
import '../App.css';

class SumCell extends PureComponent{
    render (){
        return(
                <td key={this.props.initialDataForTable.arrayOfObjects[this.props.i][0].id}
                    onMouseOver={(e)=>this.props.onMouseOverSumBlock(e,this.props.i)}
                >
                    {this.props.initialDataForTable.arrayForSumBlock[this.props.i]}
                </td>
        );
    }
}
export default SumCell;