import React, { PureComponent } from 'react';
import '../App.css';

class AverageRow extends PureComponent{
    render (){
        return(
            <tr>
                {
                    this.props.initialDataForTable.arrayForAverageBlock.map((element, i)=>
                        <td key={i}
                            onMouseOver={this.props.onMouseOutCell}
                        >
                            {this.props.initialDataForTable.arrayForAverageBlock[i]}
                        </td>
                    )
                }
                <td className="cont" onMouseOver={this.props.onMouseOutCell}/>
            </tr>
        );
    }
}
export default AverageRow;