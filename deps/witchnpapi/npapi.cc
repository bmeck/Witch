
NPNetscapeFuncs g_browser_data;

extern "C" {
//  //WINDOWS
//
//  //Browser Calls this (allows single instances)
//  NPError WINAPI NP_Initialize(NPNetscapeFuncs*);
//  NPError WINAPI NP_GetEntryPoints(NPPluginFuncs*);
//
//  NPError OSCALL NP_Shutdown();
//
//
//  //DLL resource file "metadata"
//  // -ProductName
//  // -FileDescription
//  // -MIMEType (''|''|..)
//  // -FileExtents (''|''|..)
//  // -FileOpenName (''|''|..)
//
//  //UNIX
//
//  //returns 'mime/pair:ext1,ext2:Description;...'
//  char* NP_GetMIMEDescription();
//
//  //This is how we get our product name / version
//  NPError NP_GetValue(void*, NPPVariable, void* out);
//
//  NPError NP_GetValue(void* reserved, NPPVariable var, void* out)
//  {
//    NPError ret = NPERR_NO_ERROR;
//    char**  val;
//
//    if(out == NULL)
//        { return NPERR_INVALID_PARAM; }
//
//    val = (char**)(out);
//
//    switch(var)
//    {
//        case NPPVpluginNameString:
//            *val = "Example Plug-In";
//            break;
//        case NPPVpluginDescriptionString:
//            *val = "A plug-in that demonstrates how NP_GetVal is implemented";
//            break;
//        default:
//            ret = NPERR_INVALID_PARAM;
//            break;
//    }
//
//    return ret;
//  }
//
//  NPError NP_Initialize(NPNetscapeFuncs*, NPPluginFuncs*);
//  NPError OSCALL NP_Shutdown();

  //MAC OS
  DEFINE_API_C(NPError) main(NPNetscapeFuncs* nsTable,
                           NPPluginFuncs* pluginFuncs,
                           NPP_ShutdownUPP* unloadUpp) {
    // NULL pointers are invalid
    if ( nsTable == NULL )
        { return NPERR_INVALID_PARAM; }

    // Ensure that the browser's major NPAPI version is not greater than the
    // plugin's major NPAPI version
    if( (nsTable->version >> 8) > NP_VERSION_MAJOR )
        { return NPERR_INCOMPATIBLE_VERSION_ERROR; }

    size_t copyCount = sizeof(g_browser_data);

    // Initialize the plugin's NPNetscapeFuncs structure
    memset(&g_browser_data, 0, copyCount);

    // Determine the amount of data that needs to be copied
    copyCount = (browser_data->size < copyCount)?browser_data->size:copyCount;

    // Do the copy
    memcpy(&g_browser_data, browser_data, copyCount);
    g_browser_data.size = sizeof(g_browser_data);
  }
  //Uses file metadata

  typedef struct _NPNetscapeFuncs {
    uint16 size;
    uint16 version;
    NPN_GetURLUPP geturl;
    NPN_PostURLUPP posturl;
    NPN_RequestReadUPP requestread;
    NPN_NewStreamUPP newstream;
    NPN_WriteUPP write;
    NPN_DestroyStreamUPP destroystream;
    NPN_StatusUPP status;
    NPN_UserAgentUPP uagent;
    NPN_MemAllocUPP memalloc;
    NPN_MemFreeUPP memfree;
    NPN_MemFlushUPP memflush;
    NPN_ReloadPluginsUPP reloadplugins;
    NPN_GetJavaEnvUPP getJavaEnv;
    NPN_GetJavaPeerUPP getJavaPeer;
    NPN_GetURLNotifyUPP geturlnotify;
    NPN_PostURLNotifyUPP posturlnotify;
    NPN_GetValueUPP getvalue;
    NPN_SetValueUPP setvalue;
    NPN_InvalidateRectUPP invalidaterect;
    NPN_InvalidateRegionUPP invalidateregion;
    NPN_ForceRedrawUPP forceredraw;
    NPN_GetStringIdentifierUPP getstringidentifier;
    NPN_GetStringIdentifiersUPP getstringidentifiers;
    NPN_GetIntIdentifierUPP getintidentifier;
    NPN_IdentifierIsStringUPP identifierisstring;
    NPN_UTF8FromIdentifierUPP utf8fromidentifier;
    NPN_IntFromIdentifierUPP intfromidentifier;
    NPN_CreateObjectUPP createobject;
    NPN_RetainObjectUPP retainobject;
    NPN_ReleaseObjectUPP releaseobject;
    NPN_InvokeUPP invoke;
    NPN_InvokeDefaultUPP invokeDefault;
    NPN_EvaluateUPP evaluate;
    NPN_GetPropertyUPP getproperty;
    NPN_SetPropertyUPP setproperty;
    NPN_RemovePropertyUPP removeproperty;
    NPN_HasPropertyUPP hasproperty;
    NPN_HasMethodUPP hasmethod;
    NPN_ReleaseVariantValueUPP releasevariantvalue;
    NPN_SetExceptionUPP setexception;
} NPNetscapeFuncs;
}
