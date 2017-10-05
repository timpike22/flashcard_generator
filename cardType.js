function basicCard(front, back) {
    this.front = front;
    this.back = back;
}


function clozeCard(cloze,text){
    this.cloze = cloze;
    this.partial = partial;
    this.Text = text;
};

module.exports = { 
    basicCard : basicCard,
    clozeCard : clozeCard
};

