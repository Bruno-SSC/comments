com0
    Setup everything, variables, netlify, github, files I might need later, design, etc. Started working, currently making the comment card.
com1
    finished the barebones of the comment card.
com2
    added the replies section.
com3
    added the add_comment component
com4
    except for the modal, all else is superficially done for both mobile and desktop. 
com5
    added the modal.
com6
    the score number now changes, added the specific comment elements for the current active user, added the hover effect on clicable elements, defined the comments and user data and the comments_model service and maybe some more minor adjusts.
com7
    added the reply action and even the animation for it but it still need some work.
com8
    Ongoing work on the reply animation. Moved the logic of voting comments to the service, surprisingly more complex than expected. Because of 
    - How arrays/objecs reference works; 
    - the fact that emiting a new list in a observable recreates the references in the whole thing;
    - How angular tracks elements in the view by reference by default but can be changed with trackBy property;
com9
    Solved the damn snaping problem for the reply animation. 
    Solved the lack of properly fixed widths. 
    Started taking some decisions since the design lacks it. 
    Currently, the edit form is there and i'm working on actually updating the component.
com10
    Added the edit action animatino of switching text for textfield, It took me some time to pull it off.
    Added the update logic to make the edit action actually a working feature.
com11
    Rewrited my comment_model service for a more cleaner/dry version.
com12
    - added creation and removal of replies and comments
com13 
    - fixed "id" generation
    - fixed text content of new comments fading in after the comment iself
    - added fade animations for new replies and comments
    - fixed fade out animation not triggering upon delete
com14 
    - fixed the reply_adress begin wrong when replying for a reply.
    - added the comment removal confirmation.
com15
    - split comment and reply forms.
    - fixed the autoincrement IDs duplicating.
    - fixed concurrently multi-instance editing bug of using/updating only first instance content.
    - fixed comment unlimited grow based on input text.
com16
    - fixed the attribution
    
