import JavaScriptCore
import XCTest
@testable import MathJaxSwift

final class InputProcessorOptionsTests: XCTestCase {
  
  func testTeXInputProcessorIdentity() throws {
    let context = JSContext()
    XCTAssertNotNil(context)
    
    context?.setObject(TeXInputProcessorOptions.self, forKeyedSubscript: "TeXInputProcessorOptions" as NSString)
    XCTAssertNil(context?.exception)
    
    context?.evaluateScript(MathJaxSwiftTests.identityScript)
    XCTAssertNil(context?.exception)
    
    let inputOptions = TeXInputProcessorOptions(packages: ["test"])
    let createOptions = context?.objectForKeyedSubscript("identity")
    XCTAssertNotNil(createOptions)
    
    let outputOptions = createOptions?.call(withArguments: [inputOptions])
    XCTAssertNotNil(outputOptions)
    XCTAssertTrue(outputOptions?.isObject == true)
    
    let obj = outputOptions?.toObjectOf(TeXInputProcessorOptions.self) as? TeXInputProcessorOptions
    XCTAssertEqual(inputOptions, obj)
  }
  
}
