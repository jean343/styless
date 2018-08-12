import React, {Component} from 'react';

export default WrappedComponent => {
    return class extends Component {
        state = {checked: false};
        onChange = e => {
            this.setState({checked: !!e.target.checked});
        }

        render() {
            const {children, ...props} = this.props;
            return <WrappedComponent {...props} {...this.state} >
                <input type="checkbox" checked={this.state.checked} onChange={this.onChange}/> {children}
            </WrappedComponent>;
        }
    }
}