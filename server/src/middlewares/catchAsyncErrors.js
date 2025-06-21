// function declaration approach
function catchAsyncErrors(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = catchAsyncErrors;

// Alternative implementation using arrow function syntax
// module.exports = (fn) => (req, res, next) =>
//   Promise.resolve(fn(req, res, next)).catch(next);
