import * as tf from '@tensorflow/tfjs';

const createLSTM = (vocabularySize: number, maxInputLength: number) => {
  const model = tf.sequential();

  model.add(
    tf.layers.embedding({
      inputDim: vocabularySize,
      outputDim: 64,
      inputLength: maxInputLength,
    })
  );
  model.add(
    tf.layers.lstm({
      units: 32,
      returnSequences: true,
    })
  );
  model.add(
    tf.layers.dropout({
      rate: 0.2,
    })
  );
  model.add(
    tf.layers.dense({
      units: 1,
      activation: 'sigmoid',
    })
  );

  model.compile({
    optimizer: 'adam',
    loss: 'binaryCrossentropy',
    metrics: ['accuracy'],
  });

  return model;
};

export default createLSTM;
