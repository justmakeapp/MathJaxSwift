// swift-tools-version: 5.7
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
  name: "MathJaxSwift",
  platforms: [
    .iOS(.v16)
  ],
  products: [
    .library(
      name: "MathJaxSwift",
      targets: ["MathJaxSwift"])
  ],
  dependencies: [
    .package(path: "../MathJaxSwiftAssets"),
  ],
  targets: [
    .target(
      name: "MathJaxSwift",
      dependencies: [
        .product(name: "MathJaxSwiftAssets", package: "MathJaxSwiftAssets"),
      ]
    ),
    .testTarget(
      name: "MathJaxSwiftTests",
      dependencies: ["MathJaxSwift"],
      resources: [
        .copy("Resources/Error"),
        .copy("Resources/No Error")
      ]),
  ]
)
