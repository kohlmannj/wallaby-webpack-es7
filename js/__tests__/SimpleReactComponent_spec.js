//import React from 'react' // Uncomment this line to fix it
import TestUtils from 'react/lib/ReactTestUtils.js'
import SimpleReactComponent from '../SimpleReactComponent' // Add .jsx extension to fix

describe('SimpleReactComponent', function() {

    it('should not be undefined', function() {
        var Component = TestUtils.renderIntoDocument(<SimpleReactComponent />)
        var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'section')
        element.should.not.be.undefined
    });

});

