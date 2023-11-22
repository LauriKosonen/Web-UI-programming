### How a new concurrency works and what is the main difference to old version of React rendering model?

It's a mechanic behind the scenes that can prepare multiple versions of the UI simultainiously. Unlike old rendering version it can do the rendering in different segments by pausing the update and then continuing again. It can aslo abandon rendering tasks. Old version did the rendering in one uninterupted segment that couldn't be paused or skipped.



### What is a <Suspence> component and give one example where it should be used?

Can be used for data fetching in opinionated frameworks. It handles loading states of components and can display placeholder content while the main content is still loading. So if a large application takes a long time to load up a page or some data, a loading indicator or fallback content can be displayed to show the user that the application is still loading something.


### When you should use SSR and when not?

(Server side rendering) Can be used to show users a pre loaded html page for faster loading times on slower networks and devices.
There is no need to use SSR for small single page applications because for small applications, adding SSR can increase load times, so adding it for these kind of applications is pointless.



### What is a useTransition() hook and where it should be used?

Part of the concurrent rendering feature that is used to modify transition states between component states. For example animations/transitions can be added when new window is being loaded or when a menu is opened.


### What is a useIdhook and where it should be used?

Used for generating unique IDs on client and server while avoiding hydration mismatches. It can be used with components that require unique IDs, forexample Ui testing sequences that mimic real user actions.



### A few questions was presented. Did you find some other good new feature. Just name it in here and explain why feature is good one.

UseTransition was my favourite feature, but I also found React.StrictMode, which is a tool that allows for testing how optimal a segment of code is by highlighting problems and giving warnings during development of the app. This allows the developers to write optimal code and spot errors and other issues easier than before. It is relevant only for the development and testing of the app, and not for the finished product.


