#! /usr/bin/env node

const {HTMLDocument} = require('mathjax-full/js/handlers/html/HTMLDocument.js');
const {liteAdaptor} = require('mathjax-full/js/adaptors/liteAdaptor.js');
const {SerializedMmlVisitor} = require('mathjax-full/js/core/MmlTree/SerializedMmlVisitor.js');
const {STATE} = require('mathjax-full/js/core/MathItem.js');

const {AsciiMath} = require('mathjax-full/js/input/asciimath.js');
const {TeX} = require('mathjax-full/js/input/tex.js');

const {AllPackages} = require('mathjax-full/js/input/tex/AllPackages.js');

const PACKAGES = AllPackages.sort().join(', ');
const FILTERED_PACKAGES = AllPackages.filter((name) => name !== 'bussproofs').sort().join(', ');

/**
 * Converts Tex and AsciiMath to MathML.
 */
export class MathMLConverter {
  
  /**
   * Converts a TeX input string to MathML.
   *
   * @param {string} input The TeX input string.
   * @param {boolean} inline Whether or not the TeX should be rendered inline.
   * @param {object} texOptions The TeX input options.
   * @return {string} The MathML formatted string.
   */
  static tex2mml(input, inline, texOptions) {
    const tex = new TeX(JSON.parse(JSON.stringify(texOptions)));
    return MathMLConverter.createMML(input, tex, inline);
  }
  
  /**
   * Converts an ASCIIMath input string to MathML.
   *
   * @param {string} input The ASCIIMath input string.
   * @param {boolean} inline Whether or not the ASCIIMath should be rendered inline.
   * @return {string} The MathML formatted string.
   */
  static am2mml(input, inline) {
    const asciimath = new AsciiMath();
    return MathMLConverter.createMML(input, asciimath, inline);
  }
  
  /**
   * Creates MathML data from an input string.
   *
   * @param {string} input The input string.
   * @param {object} inputJax The InputJax object.
   * @param {boolean} inline Whether or not the input should be rendered inline.
   * @return {string} The MathML formatted string.
   */
  static createMML(input, inputJax, inline) {
    const html = new HTMLDocument('', liteAdaptor(), {InputJax: inputJax});
    const visitor = new SerializedMmlVisitor();
    const toMathML = (node => visitor.visitTree(node, html));
    return toMathML(html.convert(input || '', {display: !inline, end: STATE.CONVERT}));
  }
  
}
