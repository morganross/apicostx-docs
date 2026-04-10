# How ACM Works

From the outside, ACM feels like one app. Under the hood, it is split into a few parts.

The page itself is served by WordPress. When you open `/app/`, WordPress loads the page shell and the built frontend files. That is why the app feels like part of the main site.

Inside that page, the browser runs the frontend app. That frontend is what you click on when you move between Quality, Presets, Configure, Execute, History, and Settings.

When the frontend needs to do real work, it talks to the ACM backend. The backend is a separate service. It handles the actual run data, saved settings, provider keys, GitHub connections, and execution logic.

WordPress also helps with sign-in. If you are logged in, WordPress gives the frontend a short-lived session token so the browser can talk to the backend as your account.

So the simplest way to think about ACM is this:

WordPress serves the page and account shell.
The frontend gives you the working interface.
The backend stores the data and does the heavy work.

This split matters because it explains a lot of the behavior you will see. The app pages live on the main site, but many actions are really requests to the backend. Settings in the browser depend on both sides working together.

It also explains why some bugs feel strange. A page can load correctly from WordPress while a run still fails because the backend or your provider keys are not ready. Or a page can render while a browser-side script problem breaks one route. The system is connected, but it is not all one process.

For a step-by-step view of what happens during a run, read [full-pipeline.md](full-pipeline.md).
