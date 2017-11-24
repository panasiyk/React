import React, { Component } from 'react';
import Matrix from '../containers/Matrix';
import '../App.css';

class AppComponent extends Component{
    render (){
        return(
            <div>
                <input className="row"
                       name={"rows"}
                       type="text"
                       onChange={this.props.onChangeInput}
                       value={this.props.initialData.rowsCount}
                       placeholder="Кількість рядків"	/>

                <input className="column"
                       name={"columns"}
                       type="text"
                       onChange={this.props.onChangeInput}
                       value={this.props.initialData.columnsCount}
                       placeholder="Кількість стовпців"	/>

                <input className="numberForIllumination"
                       name={"Illumination"}
                       type="text"
                       onChange={this.props.onChangeInput}
                       value={this.props.initialData.numberForIllumination}
                       placeholder="Кількість підсвічування" />

                <Matrix initialData={this.props.initialData}
                        increaseRowCount={this.props.increaseRowCount}
                        reduceRowCount={this.props.reduceRowCount}/>
            </div>
        );
    }
}
export default AppComponent;