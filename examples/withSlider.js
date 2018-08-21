import React, {Component} from 'react';

export default (WrappedComponent, {min = 0, max = 100} = {}) => {
    return class extends Component {
        state = {value: 0};
        onChange = e => {
            this.setState({value: e.target.value});
        }

        render() {
            const {children, ...props} = this.props;
            return <WrappedComponent {...props} {...this.state} >
                <input type="range" min={min} max={max} step={10} value={this.state.value} onChange={this.onChange}/>{children}
            </WrappedComponent>;
        }
    }
}