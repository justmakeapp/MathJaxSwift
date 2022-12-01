#! /usr/bin/env node

const {mathjax} = require('mathjax-full/js/mathjax.js');
const {SVG} = require('mathjax-full/js/output/svg.js');
const {liteAdaptor} = require('mathjax-full/js/adaptors/liteAdaptor.js');
const {RegisterHTMLHandler} = require('mathjax-full/js/handlers/html.js');
const {AssistiveMmlHandler} = require('mathjax-full/js/a11y/assistive-mml.js');

const {MathML} = require('mathjax-full/js/input/mathml.js');
const {TeX} = require('mathjax-full/js/input/tex.js');
const {AllPackages} = require('mathjax-full/js/input/tex/AllPackages.js');

const PACKAGES = AllPackages.sort().join(', ');

const CSS = [
  'svg a{fill:blue;stroke:blue}',
  '[data-mml-node="merror"]>g{fill:red;stroke:red}',
  '[data-mml-node="merror"]>rect[data-background]{fill:yellow;stroke:none}',
  '[data-frame],[data-line]{stroke-width:70px;fill:none}',
  '.mjx-dashed{stroke-dasharray:140}',
  '.mjx-dotted{stroke-linecap:round;stroke-dasharray:0,140}',
  'use[data-c]{stroke-width:3px}'
].join('');

/**
 * Converts TeX and MathML input to SVG.
 */
export class SVGConverter {
  
  /**
   * Converts a TeX input string to SVG.
   *
   * @param {string} input The TeX input string.
   * @param {boolean} inline Whether or not the TeX should be rendered inline.
   * @param {object} containerConfig The SVG container configuration.
   * @param {object} svgConfig The SVG output configuration.
   * @return {string} The SVG formatted string.
   */
  static tex2svg(input, inline, containerConfig, svgConfig) {
    const tex = new TeX({packages: PACKAGES.split(/\s*,\s*/)});
    return SVGConverter.createSVG(input, tex, inline, containerConfig, svgConfig);
  }
  
  /**
   * Converts a MathML input string to SVG.
   *
   * @param {string} input The MathML input string.
   * @param {boolean} inline Whether or not the MathML should be rendered inline.
   * @param {object} containerConfig The SVG container configuration.
   * @param {object} svgConfig The SVG output configuration.
   * @return {string} The SVG formatted string.
   */
  static mml2svg(input, inline, containerConfig, svgConfig) {
    const mml = new MathML();
    return SVGConverter.createSVG(input, mml, inline, containerConfig, svgConfig);
  }
  
  /**
   * Creates SVG data from an input string.
   *
   * @param {string} input The input string.
   * @param {object} inputJax The InputJax object.
   * @param {boolean} inline Whether or not the input should be rendered inline.
   * @param {object} containerConfig The SVG container configuration.
   * @param {object} svgConfig The SVG output configuration.
   * @return {string} The SVG formatted string.
   */
  static createSVG(input, inputJax, inline, containerConfig, svgConfig) {
    const svgContainer = JSON.parse(containerConfig);
    const adaptor = liteAdaptor();
    const handler = RegisterHTMLHandler(adaptor);
    if (svgContainer.assistiveMml) AssistiveMmlHandler(handler);
    const svg = new SVG(JSON.parse(svgConfig));
    const html = mathjax.document('', {InputJax: inputJax, OutputJax: svg});
    const node = html.convert(input || '', {
      display: !inline,
      em: svgContainer.em,
      ex: svgContainer.ex,
      containerWidth: svgContainer.width
    });
    
    if (svgContainer.css) {
      return adaptor.textContent(svg.styleSheet(html));
    } else {
      let html = (svgContainer.container ? adaptor.outerHTML(node) : adaptor.innerHTML(node));
      return svgContainer.styles ? html.replace(/<defs>/, `<defs><style>${CSS}</style>`) : html;
    }
  }
  
}