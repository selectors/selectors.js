/* This file offers helper functions for parsing namespaces in the type, universal and
 * attribute selectors.
 */

/* This function splits the namespace and name from e.g. "foo|bar" into an object.
 * ------
 * @{namespaceAndName}: A STRING containing a namespace and name.
 */
s._splitNamespaceAndName = function(namespaceAndName) {  
  if (!namespaceAndName || typeof namespaceAndName !== "string")
    return false;
    
  var r = {
    namespace: null,
    name: null
  };
  
  if (!s._r.namespaceAndName)
    s._r.namespaceAndName = new RegExp("^" + s._namespace_prefix);
  
  r.name = namespaceAndName.replace(
    s._r.namespaceAndName, function(match) {
      r.namespace = match.substr(0, match.length - 1);
      return '';
    }
  );
  
  return r;
}