import { useState } from "react";
import sourceCode from "./Local State.json";

export const ProfileGenerator = () => {
  const profiles = sourceCode.profile.info_cache;
  const lastIndex = sourceCode.profile.profiles_created + 1;

  const [profileNameIndex, setprofileNameIndex] = useState("");
  const [profileCount, setProfileCount] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileArray, setProfileArray] = useState(Object.entries(profiles));
  const [removeCode, setRemoveCode] = useState("");

  const formCss = { height: "30px", margin: "5px", marginTop: "40px", width: "60px"};
  const inputCss = { padding: "5px", textAlign: "center"};
  const buttonCss = { height: "30px", margin: "5px", marginTop: "40px", width: "60px", backgroundColor: "black", color: "white"};
  const blockCss = {
    padding: "5px",
    paddingLeft: "50px",
    paddingRight: "30px",
    display: "flex",
    textAlign: "left",
    backgroundColor: "grey",
    margin: "5px",
    color: "white",
    borderRadius: "5px",
  };
  const blockHeaderCss = {
    padding: "5px",
    paddingLeft: "50px",
    paddingRight: "35px",
    display: "flex",
    textAlign: "left",
    backgroundColor: "black",
    margin: "5px",
    color: "white",
    borderRadius: "5px",
  };
  const itemCss = {
    width: "30%",
    textAlign: "center"
  }
  const itemActionCss = {
    textAlign: "right",
    width: "40%",
  }

  const addProfiles = () => {
    if(profileName !== "") {
      for (let i = 0; i < profileCount; i++) {
        profiles["profile " + (lastIndex + i - 1)] = {
          active_time: 1687561324.20602,
          avatar_icon: "chrome://theme/IDR_PROFILE_AVATAR_26",
          background_apps: false,
          default_avatar_fill_color: -12178840,
          default_avatar_stroke_color: -1,
          force_signin_profile_locked: false,
          gaia_given_name: "",
          gaia_id: "",
          gaia_name: "",
          hosted_domain: "",
          is_consented_primary_account: false,
          is_ephemeral: false,
          is_using_default_avatar: true,
          is_using_default_name: false,
          managed_user_id: "",
          metrics_bucket_index: lastIndex + i,
          name: profileName + (profileNameIndex + i),
          profile_highlight_color: -12178840,
          shortcut_name: profileName + (profileNameIndex + i),
          "signin.with_credential_provider": false,
          user_accepted_account_management: false,
          user_name: "",
        };
      }
    }
    else {
      alert("Please type Profile Name!");
    }
    setProfileArray(Object.entries(profiles));
  };

  const generateFile = () => {    
    const keys = Object.keys(profiles);
    const lastKey = keys[keys.length - 1];
    const lastValue = profiles[lastKey];    
    sourceCode.profile.info_cache = profiles;
    sourceCode.profile.profiles_created = lastValue.metrics_bucket_index
    const filename = "Local State.json";

    const blob = new Blob([JSON.stringify(sourceCode)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    
    const folderNames = Object.entries(profiles);
    let extensionCode = "";
    let extensionLength = lastValue.metrics_bucket_index + 1 - lastIndex;
    for(let i = folderNames.length - 1; i >= folderNames.length - extensionLength; i--) {
      extensionCode += 'xcopy /e /i /-y "C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\User Data\\sourceExtension" "C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\User Data\\' + folderNames[i][0] + '"\n'; 
      console.log(extensionCode);
    }
    const filenameExtension = "extension.bat";

    const blobExtension = new Blob([removeCode + extensionCode], { type: "text/plain" });
    const urlExtension = URL.createObjectURL(blobExtension);
    const linkExtension = document.createElement("a");
    linkExtension.href = urlExtension;
    linkExtension.download = filenameExtension;
    linkExtension.click();
  };

  const removeProfile = (e) => {
    let temp = removeCode;
    temp += 'rd /S /Q "C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\User Data\\' + e.target.id + '"\n'; 
    setRemoveCode(temp);
    delete profiles[e.target.id];
    setProfileArray(Object.entries(profiles));
  }

  return (
    <>
      <div
        style={{
          paddingLeft: "20px",
          paddingTop: "50px",
          width: "70%",
          minWidth: "800px",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={formCss}>
          <input
            placeholder="Profile Name"
            style={inputCss}
            value={profileName}
            type="text"
            onChange={(e) => {
              setProfileName(e.target.value);
            }}
          />
        </span>
        <span style={formCss}>
          <input
          placeholder="Start Index"
            style={inputCss}
            value={profileNameIndex}
            type="number"
            min={0}
            onChange={(e) => {
              setprofileNameIndex(Number(e.target.value));
            }}
          />
        </span>
        <span style={formCss}>
          <input
            placeholder="Profile Count"
            style={inputCss}
            value={profileCount}
            type="number"
            min={1}
            onChange={(e) => {
              setProfileCount(Number(e.target.value));
            }}
          />
        </span>
        <span>
          <button style={buttonCss} id="generate-btn" onClick={addProfiles}>
            Add
          </button>
          <button style={buttonCss} id="generate-btn" onClick={generateFile}>
            Save
          </button>
        </span>
      </div>

      <div
        style={{
          marginTop: "50px",
          width: "70%",
          minWidth: "800px",
          margin: "auto",        
          padding: "20px",
          paddingRight: "0px",
        }}
      > 
        <div style={blockHeaderCss}>
          <span style={itemCss}>Profile Name</span>
          <span style={itemCss}>Profile Folder Name</span>
          <span style={itemActionCss}>Action</span>
        </div>
        {profileArray.map((item, index) => (
          <div key={index} style={blockCss} className="record">
            <span style={itemCss}>{item[1].shortcut_name}</span>
            <span style={itemCss}>{item[0]}</span>
            <span style={itemActionCss}>
              <span style={{cursor: "pointer", userSelect: "none"}} 
               className="btnRemove" 
                onClick={removeProfile} id={item[0]}>
                Remove
              </span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
