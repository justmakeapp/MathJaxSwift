//
//  AM2MML.swift
//  MathJaxSwift
//
//  Created by Colin Campbell on 11/29/22.
//

import Foundation

extension MathJax {
  
  /// Converts an ASCIIMath input string to MathML.
  ///
  /// - Parameters:
  ///   - input: The input string containing ASCIIMath.
  ///   - inline: Process the math as inline or not.
  ///   - queue: The queue to execute the conversion on.
  /// - Returns: MathML formatted output.
  public func am2mml(
    _ input: String,
    inline: Bool = false,
    queue: DispatchQueue = .global()
  ) async throws -> String {
    return try await perform(on: queue) { mathjax in
      try mathjax.am2mml(input, inline: inline)
    }
  }
  
  /// Converts an ASCIIMath input string to MathML.
  ///
  /// - Parameters:
  ///   - input: The input string containing ASCIIMath.
  ///   - inline: Process the math as inline or not.
  /// - Returns: MathML formatted output.
  public func am2mml(_ input: String, inline: Bool = false) throws -> String {
    return try callFunction(.am2mml, with: [
      input,
      inline
    ])
  }
  
}