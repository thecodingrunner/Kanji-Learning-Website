const calculateStatistics = (cardsArray, user) => {
    // calculate cards
    let totalCards = cardsArray.length;

    // calculate cards learned
    let cardsLearned = cardsArray.filter(card => card.interval > 600).length;

    // calculate cards created
    let cardsCreated = cardsArray.filter(card => card.author === user.name).length;

    // calculate total revisions
    let totalRevisions = cardsArray.reduce((sum, card) => sum + card.revisions, 0);

    // calculate total reviews
    let totalReviews = cardsArray.reduce((sum, card) => sum + card.reviews, 0);

    // calculate total correct
    let totalCorrect = cardsArray.reduce((sum, card) => sum + card.correctRevisions, 0);

    // calculate total incorrect
    let totalIncorrect = totalReviews - totalCorrect;

    // calculate accuracy
    let accuracy = (totalCorrect/totalReviews)*100;

    let learnerXp = cardsLearned*(accuracy/100);

    return { totalCards, cardsLearned, cardsCreated, totalRevisions, totalReviews, totalCorrect, totalIncorrect, accuracy, learnerXp };
}

export default calculateStatistics;