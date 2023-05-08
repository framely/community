# 5: Tuning strategy

Introduced by Vaswani et al. in 2017, the Transformer architecture, a multiple layers of self-attention and feedforward neural networks, has become the standard architecture for training large language models, also known as foundation models.

The traditional method of training separate models for each NLP task, which necessitates a considerable amount of labeled data for every task, has been swiftly replaced by a multi-stage learning paradigm centered on a universal foundational model. This approach is more production-friendly since it necessitates little or even no labeled data for each new task. We have explained how these few-shot capability comes into being in a [previous blog](towards-zero-shot), let’s take a look how to use foundation model to [solve dialog understanding tasks](new-formulations).

## How foundation model are trained
Foundation models are typically trained in two stages: pre-training and fine-tuning. During the pre-training stage, a large, high quality corpus of text is compiled from various sources, such as books, articles, and web pages. Using a self-labeling schema that either auto-regressively predicts the next word in a sequence given the previous words in the sequence (like ChatGPT) or auto-associatively predicts the original text given a token sequence with a part of it randomly masked (like Bert), these unlabeled texts can then be used to train a foundation model able to produce high-quality meaning representations of text.

After pre-trained on a large corpus of text, foundation models can be further fine-tuned on many tasks, such as language translation or text generation. For decoder based model like GPT, fine-tuning is framed as a universal conditional text generation problem. Specifically, labeled data points in the form of (task, input, output) are transformed into labeled data in the form of (prompt, output), where the prompt is a natural language representation of the task and original input. For example: (*English to Chinese translation, how are you today, 你今天怎么样*) can be reformulated into (*translate “how are you today” into Chinese, 你今天怎么样*), and (*grammar check, “Stalin were a dictator”, “Stalin was a dictator”*) into (*grammar check: Stalin were a dictator, Stalin was a dictator*). Training with reformulated labeled data from many tasks, commonly known instruction fine-tuning or instruction tuning for short, results in a universal model that can treat text input as instructions.

The result of these expensive training is the weights for model’s parameter. Foundation models consist of three layers, the parameters for each layer are used for different purpose:

1. Embedding parameters: These are the parameters used to map input tokens (e.g., words, subwords) to high-dimensional vectors called embeddings.

2. Transformer parameters: These are the parameters that define the architecture of the Transformer model, which is used to process the input embeddings and generate representation that summarize the token sequences. The parameter for this layer are typically shared between multiple tasks, and kept frozen during later stage learning.

3. Output parameters: These are the parameters used to generate the output sequence from the final layer of the Transformer. In the case of a language modeling task, the output parameters would typically be the weights of a linear layer that maps the output embeddings back to a vocabulary distribution over the possible output tokens. Clearly different tasks need different output parameters.

Depending on the proportion of parameters that are modified, there are three strategies for solving NLP tasks using existing foundation models. Let’s see what are these, and which one should we use for dialog understanding tasks.

## Full-tuning
Full-tuning, commonly known as fine-tuning, refers to a process where a foundation model is further trained on a new task, using a new dataset with the goal that this later stage tuning can adept the knowledge embedded in the foundation model to this new task.

In full-tuning, weights are initially initialized based on the foundation model, but all weights can be modified during the tuning process. Full-tuning usually yields the best performance (in terms of accuracy, not speed) among all three tuning strategies. Nevertheless, as models grow in size, storing and deploying a fine-tuned model for each downstream task may become impractical.

## No tuning: in-context learning
The instruction-tuned foundation model, like InstructGPT, demonstrated convincingly that a frozen model can perform different tasks through “in-context” learning. With this approach, a user primes the model for a given task through prompt design or prompt engineering, i.e., hand-crafting a text prompt with a description and sometimes examples of the task. For instance, to predict whether a movie review is positive or not, one could prepend *“Is the following movie review positive or negative?”* before the actual review to form the prompt, and hopeful get *“This movie was amazing!”* in return.

During the in-context learning, all weights are kept frozen. So a single model can serve many tasks. But prompts require careful design, as small change in prompts can result in drastic change in performance. Furthermore, even well-designed prompts can still far under-perform compared to full-tuning. For instance, the performance of a frozen GPT-3 175B parameter model on the [SuperGLUE](https://super.gluebenchmark.com/) benchmark is 5 points below a fine-tuned [T5 model](https://ai.googleblog.com/2020/02/exploring-transfer-learning-with-t5.html) that uses 800 times fewer parameters. Finally, this paradigm can only use handful of labeled examples, since all examples need to fit into receptive fields of the foundation model (limited to 2k tokens usually). This further limits the performance of this approach.

## Delta-tuning
Only small portion of parameters have their weights changed in this family of methods, and these change can be captured by delta weights. The most popular delta-turning, such as prompt tuning, are additive in nature, where extra trainable parameters are introduced.

Prompt tuning is an effective last stage learning method that encode input into prompts. But rather than prepending existing tokens (with hard, fixed embedding), we prepend new tokens whose embedding need to be learned (thus also known as soft tokens) to input to form prompt. Conceptually, the soft prompt is trained to captures how to map input to output exemplified by the labeled dataset, performing the same role as a manually written text prompt, but is robustly defined using examples.

Prompt tuning is an effective last-stage learning method that also encodes input into prompts. Instead of adding existing tokens with a fixed, hard embedding at the beginning of the input, we add new tokens (also known as soft tokens) whose embeddings need to be learned. The soft prompt is trained to capture the mapping from input to output, as encoded in the labeled dataset, fulfilling the same role as a manually created prompt template.

In prompt tuning, the only weights that get changed are the embedding weight corresponding to these soft tokens. The rest of weight, include transformer weights, output weights, and embedding weights for existing tokens are kept frozen. However, given a reasonable sized foundation model, it is shown that prompt tuning can reach the same performance as fine-tuning, particularly when the foundation model is big enough.

There many different flavors of delta-tuning. For example, we can have a different output layer for each task, but share the frozen transformer and embedding parameters.

## Conclusion
To build conversational user interface for real world services, we typically need to solve multiple NLP tasks, and often in a incremental fashion.

Given this circumstance, fine-tuning is clearly not a good option. The memory requirements for serving multiple models, as well as the need to retrain every time there are changes, do not provide a good developer experience.

While prompt engineering or in-context learning is a useful tool for addressing ad-hoc tasks, its lower accuracy, incapability to incorporate more labeled data, and the quadratic growth in inference cost concerning the number of tokens in prompts make it unsuitable for any practical production scenarios.

That leaves us with prompt tuning. Prompt tuning can achieve high-level performance that was previously only possible through fine-tuning. Solutions to new tasks can be incrementally developed, and its inference cost is similar to that of fine-tuning, as generally only a few soft tokens are required. Therefore, it should be the default choice when addressing NLP tasks in production, and when feasible, use a multitask fine-tuned foundation model such as [FLAN-T5](https://arxiv.org/abs/2210.11416) as starting point. In fact, delta-tuning-based solutions should generally be preferred when possible for the same reasons.

Reference:
1. [Towards Zero Shot](towards-zero-shot)
2. [New Formulations](new-formulations)
3. [Guiding Frozen Language Models with Learned Soft Prompts](https://ai.googleblog.com/2022/02/guiding-frozen-language-models-with.html)
4. [Scaling Instruction-Finetuned Language Models](https://arxiv.org/abs/2210.11416)
5. [Delta Tuning: A Comprehensive Study of Parameter Efficient Methods for Pre-trained Language Models](https://arxiv.org/pdf/2203.06904.pdf)
