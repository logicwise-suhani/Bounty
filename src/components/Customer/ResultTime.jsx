import { useEffect } from "react";

function ResultTime() {

    const showResult = () => {
        let randomNum = JSON.parse(localStorage.getItem("randomNum")) || [];
        const prediction = JSON.parse(localStorage.getItem("predictions")) || [];

        if (!randomNum.length) {
            randomNum = prediction.map(() => {
                return Math.floor(Math.random() * 99) + 1;
            });

            localStorage.setItem("randomNum", JSON.stringify(randomNum));
            window.dispatchEvent(new Event("randomUpdated"));
        }

        const finalResults = prediction.map((pred, index) => {
            const randomValue = randomNum[index];

            const isWon = Array.isArray(pred.numbers) && pred.numbers.includes(randomValue);

            return {
                ...pred,
                chance: pred.chance,
                numbers: pred.numbers,
                randomValue,
                status: isWon ? "WON" : "LOSS",
            };
        });

        localStorage.setItem("finalResults", JSON.stringify(finalResults));

        const history = JSON.parse(localStorage.getItem("gameHistory")) || [];

        const totalWins = finalResults.filter((r) => r.status === "WON").length;
        const totalBalance = totalWins > 0 ? 1000 * Math.pow(10, totalWins) : 1000;

        const customerData = JSON.parse(localStorage.getItem("customer"));
        const playerName = customerData?.email ? customerData.email.split("@")[0] : "Unknown";

        history.push({
            id: Date.now(),
            time: new Date().toISOString(),
            player: playerName,
            totalBalance,
            results: finalResults.length > 0 ? finalResults : "No data",
        });

        localStorage.setItem("gameHistory", JSON.stringify(history));
        window.dispatchEvent(new Event("resultsUpdated"));
    };

    useEffect(() => {
        const interval = setInterval(() => {

            const now = Date.now();

            const rounds = JSON.parse(localStorage.getItem("chances")) || [];
            if (!rounds.length) return;

            const sortedRounds = [...rounds].sort((a, b) => new Date(a.time) - new Date(b.time));

            const activeRound = sortedRounds.filter((r) => now >= new Date(r.time).getTime()).pop();
            if (!activeRound) return;

            const roundTime = new Date(activeRound.time).getTime();
            const alreadyRun = localStorage.getItem(`result_done_${roundTime}`);

            if (now >= roundTime && !alreadyRun) {
                showResult();
                localStorage.setItem(`result_done_${roundTime}`, "true");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return null;
}

export default ResultTime;