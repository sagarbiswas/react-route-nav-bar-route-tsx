//import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function BlockNavigationOnUnsavedData() {
    const [shouldBlock, setShouldBlock] = useState(false);
    const refInput = useRef<HTMLInputElement>(null);
    //const navigate = useNavigate();
    // Block browser navigation // Not working for back button
    const handlePopState = (e: any) => {
        if (shouldBlock) {
            const confirm = window.confirm('Unsaved changes. Continue?');
            if (!confirm) {
                window.history.pushState(null, '', window.location.pathname);
            }
        }
    };

    const handleBeforeUnload = (e: any) => {
        if (shouldBlock) {
            e.preventDefault();
            e.returnValue = '';
            return '';
        }
    };

    useEffect(() => {
        if (!shouldBlock) {
            return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
                window.removeEventListener('popstate', handlePopState);
            };
        }
        // Block programmatic navigation
        const originalPush = window.history.pushState;
        window.history.pushState = function (...args) {
            console.log("window.location.pathname " + window.location.pathname);
            //if (shouldBlock && window.location.pathname.indexOf("block") >= 0) {
            // hack as shouldBlock is not getting updated here
            if (refInput?.current?.value && refInput.current.value.trim().length > 0 
                && shouldBlock  && window.location.pathname.indexOf("block") >= 0) {
                const confirm = window.confirm('Your page data is not save changes. Are you want to leave the page?');
                if (!confirm) return;
            }
            originalPush.apply(window.history, args);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [shouldBlock])
    return (<div>
        <form /*onChange={() => setHasChanges(true)}*/ onSubmit={() => setShouldBlock(false)}>
            <h1>Block Navigation On Unsaved Data</h1>
            <input ref={refInput}
                onChange={(e) => {
                    console.log(e.target.value.trim().length);
                    setShouldBlock(e.target.value.trim().length > 0 ? true : false);
                }}
                type="text"
                placeholder="Type something to simulate unsaved changes..."
                style={{ width: "400px", height: "40px" }}
            />
            <br /><br />
            <button type="submit" style={{ width: "150px", height: "40px" }}>Save Changes</button>
        </form>
    </div>
    )
}


// function BlockNavigationOnUnsavedData() {
//   const navigate = useNavigate();
//   const location = useLocation();
// const [shouldBlock, setHasChanges] = useState(false);
//   useEffect(() => {
//     if (!shouldBlock) return;

//     const handlePopState = (e:any) => {
//         debugger;
//       if (shouldBlock) {
//         const confirm = window.confirm('You have unsaved changes. Continue?');
//         if (!confirm) {
//           e.preventDefault();
//           window.history.pushState(null, '', location.pathname);
//         }
//       }
//     };

//     window.addEventListener('popstate', handlePopState);
//     return () => window.removeEventListener('popstate', handlePopState);
//   }, [shouldBlock, location]);

//    return(
//     //React.Fragment.
//         <form onChange={() => setHasChanges(true)} onSubmit={() => setHasChanges(false)}>
//         <h1>Block Navigation On Unsaved Data</h1>

//         <input type="text" placeholder="Type something to simulate unsaved changes..." style={{width:"400px",height:"40px"}} />
//         <br /><br />
//         <button type="submit" style={{width:"150px",height:"40px"}}>Save Changes</button>   
//         </form>
//     )
// }

// export default BlockNavigationOnUnsavedData;

export default BlockNavigationOnUnsavedData;