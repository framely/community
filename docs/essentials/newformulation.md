# Hot fixable dialog understanding by everyone

One of the main design goals of OpenCUI is to provide state-of-the-art dialog understanding capabilities with a great developer experience. By "developer," we mean the existing business application developer, and we do not assume that they have a background in machine learning or natural language understanding. Ideally, it should be possible for these developers to build and fix the dialog understanding capabilities without going through a steep learning curve.

Formulating dialog understanding as traditional intent classification and named entity recognition has many drawbacks in practice. Therefore, OpenCUI adopts a set of new task formulations. Instead of focusing on literal meanings, these new formulations aim to convert user utterances into implied meanings in the context of the services that the business provides. This can greatly simplify the development of the downstream dialog management module. Large language model-based solutions for these new formulations offer excellent zero-shot/few-shot capabilities, making them much more production-friendly.

