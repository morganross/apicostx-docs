# Core Concepts

ACM makes more sense once a few core ideas are clear.

A preset is a saved starting setup. It tells ACM what kind of run you want to do and fills in a lot of the settings for you. Most people should begin with a preset, not a blank page.

A run is one execution of work. When you press start, ACM creates a run. That run keeps its own settings, progress, logs, and results. You can come back later and inspect it in History.

The Content Library is where reusable inputs live. That includes source documents, instructions, and evaluation criteria. Instead of rewriting the same input over and over, you can store it once and use it again.

Provider keys are the credentials ACM needs so it can call outside services such as model providers or search providers. Without a working provider key, many runs cannot actually do work.

GitHub connections are a separate thing. They are for browsing or importing files from a repository. They do not replace provider keys.

The Configure page is where you shape the run. The Execute page is where you watch it happen. The History page is where you revisit finished work.

You will also see names like FPF, GPTR, and DR. These are different workflow types inside ACM. You do not need to understand all of them on day one. At first, it is enough to know that they are different ways ACM can perform the work.

Evaluation is the part where ACM scores or compares outputs. Combine is the part where ACM takes earlier results and tries to produce a better or more useful final result from them.

The Quality page is different from the run pages. It is a read-only page that shows model quality and cost comparison data. It helps you think about model choices, but it is not where you execute work.
