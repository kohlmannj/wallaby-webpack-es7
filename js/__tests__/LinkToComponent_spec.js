import React from 'react'
var TestUtils = require('react/addons').addons.TestUtils
var LinkToComponent = require('../LinkToComponent.jsx')

describe('LinkToComponent', function() {

    it('creates an A element', function() {
        var Component = TestUtils.renderIntoDocument(<LinkToComponent controller="ctrl" action="action">test</LinkToComponent>)
        var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'a')
        element.should.not.be.undefined
    });

    it('creates proper href attribute', function() {
        var Component = TestUtils.renderIntoDocument(<LinkToComponent controller="ctrl" action="action">test</LinkToComponent>)
        var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'a')
        element.getDOMNode().getAttribute('href').should.match(/\/ctrl\/action$/)
    });

    it('creates proper href attribute for id', function() {
        var Component = TestUtils.renderIntoDocument(<LinkToComponent controller="ctrl" action="action" id="35">test</LinkToComponent>)
        var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'a')
        element.getDOMNode().getAttribute('href').should.match(/\/ctrl\/action\/35$/)
    });

    it('creates proper href attribute for id with type number', function() {
        var Component = TestUtils.renderIntoDocument(<LinkToComponent controller="ctrl" action="action" id={3}>test</LinkToComponent>)
        var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'a')
        element.getDOMNode().getAttribute('href').should.match(/\/ctrl\/action\/3$/)
    });

    it('links to controller root if action is not specified via props', function() {
        var Component = TestUtils.renderIntoDocument(<LinkToComponent controller="ctrl">test</LinkToComponent>)
        var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'a')
        element.getDOMNode().getAttribute('href').should.match(/\/ctrl$/)
    });

    it('set "is-active" className if controller and pageController are the same and action was not set', function() {
        var Component = TestUtils.renderIntoDocument(<LinkToComponent controller="ctrl" pageController="ctrl" pageAction="action">test</LinkToComponent>)
        var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'a')
        element.getDOMNode().getAttribute('class').should.eq('LinkToComponent LinkToComponent_is-active is-active')
    });

    it('set "is-active" className if controller and pageController and action and pageAction are the same', function() {
        var Component = TestUtils.renderIntoDocument(<LinkToComponent controller="ctrl" action="action" pageController="ctrl" pageAction="action">test</LinkToComponent>)
        var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'a')
        element.getDOMNode().getAttribute('class').should.eq('LinkToComponent LinkToComponent_is-active is-active')
    });

    it('should not set "is-active" className if action and pageAction arent the same for the same controller', function() {
        var Component = TestUtils.renderIntoDocument(<LinkToComponent controller="ctrl" action="action" pageController="ctrl" pageAction="differentAction">test</LinkToComponent>)
        var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'a')
        element.getDOMNode().getAttribute('class').should.eq('LinkToComponent')
    });

    it('add "is-active" className to the passed className', function() {
        var Component = TestUtils.renderIntoDocument(<LinkToComponent controller="ctrl" action="action" pageController="ctrl" pageAction="action" className="custom custom_mod">test</LinkToComponent>)
        var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'a')
        element.getDOMNode().getAttribute('class').should.eq('LinkToComponent LinkToComponent_is-active custom custom_mod is-active')
    });

    it('should render children', function() {
        var Component = TestUtils.renderIntoDocument(<LinkToComponent><i>test</i></LinkToComponent>)
        var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'i')
        element.should.not.be.undefined
    });

    it('should render styles', function() {
        var Component = TestUtils.renderIntoDocument(<LinkToComponent style={{left:10}}>test</LinkToComponent>)
        var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'a')
        element.getDOMNode().style.left.should.eq('10px')
    });

});

