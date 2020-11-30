function isDevelopment() {
    return process.env.NODE_ENV === 'development';
}

exports.isDevelopment = isDevelopment;