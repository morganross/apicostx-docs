# The Full Pipeline

A full ACM run is more than one model call. It is a chain of steps.

It starts with a preset or a saved configuration. That tells ACM what kind of work to do, which workflow types are enabled, which models to use, and how much evaluation or post-processing should happen.

Then ACM pulls in the input material. That may be a source document, a prompt instruction, evaluation criteria, or a file imported from GitHub. The run now has both the instructions and the raw material it needs.

Next comes generation. Depending on the setup, ACM may run one or more workflow types such as FPF, GPTR, or DR. The important idea is simple: ACM is producing candidate outputs.

After that, ACM can evaluate those outputs. This is where judge models and scoring rules matter. Instead of only asking, "Which answer do I like more?", the run can apply a repeatable scoring step.

Then ACM can compare, rank, or combine results. In some setups that means picking stronger outputs. In others it means feeding earlier work into another step that tries to build a better final result.

Finally, ACM saves the run. That includes status, logs, outputs, and the history record. This is one of the most important parts of the system. A run is not just a moment on the screen. It becomes something you can inspect later.

Not every run uses every stage. A simple run may only use generation and output review. A fuller run may use generation, evaluation, combine, and later comparison in History. The pipeline is best thought of as a menu of stages that can be turned on or off, not a single fixed recipe.

The value of the full pipeline is that the whole chain is captured in one place. You do not have to remember which prompt you changed, which model you used, or whether the result was judged by the same rules as last time.
