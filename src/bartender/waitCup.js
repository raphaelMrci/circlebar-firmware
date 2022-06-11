async function waitCupRemoved() {
    return new Promise((resolve, reject) => {
        console.log("Waiting cup removed");
        setTimeout(() => {
            resolve();
        }, 5000);
    });
}

module.exports = {
    waitCupRemoved,
};
