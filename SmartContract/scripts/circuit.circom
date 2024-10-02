template ProofOfKnowledge() {
    signal input secret;
    signal input publicInput;
    signal output out;

    out <== secret + publicInput;
}

component main = ProofOfKnowledge();