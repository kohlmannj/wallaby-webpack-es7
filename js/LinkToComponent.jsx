import React from 'react'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin'

let LinkToComponent = React.createClass({

    mixins: [PureRenderMixin],

    propTypes: {
        controller: React.PropTypes.string.isRequired,
        action: React.PropTypes.string,
        id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        pageController: React.PropTypes.string,
        pageAction: React.PropTypes.string,
    },

    statics: {
        getURL(controller: string, action: string, id: string, prefix = "/") {
            if (!controller) {
                return '#'
            } else {
                let str = prefix + controller
                if (action) {
                    str += '/' + action
                }
                if (id) {
                    str += '/' + id
                }
                return str
            }
        }
    },

    getDefaultProps() {
        return {
            controller: "",
        }
    },

    render() {
        let {controller, action, id, ...props} = this.props
        return (
            <a
                href={LinkToComponent.getURL(controller, action, id)}
                {...props}
            >{this.props.children}</a>
        )
    }

})

export default LinkToComponent
