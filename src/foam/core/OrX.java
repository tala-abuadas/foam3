/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.core;

/** Simple Or X implementation.
    get - first test delegate, then local
    put - put to delegate
 **/
public class OrX
  extends    ProxyX
{
  X localX_;
  
  public OrX() {
    this(EmptyX.instance(), EmptyX.instance());
  }

  public OrX(X x) {
    this(x, EmptyX.instance());
  }

  public OrX(X x, X delegate) {
    super(delegate);
    localX_ = x;
  }

  public <T> T get(Class<T> key) {
    T t = getX().get(key);
    if ( t == null ) return (T) localX_.get(this, key);
    return t;
  }

  public Object get(X x, Object key) {
    Object o = getX().get(x, key);
    if ( o == null ) return localX_.get(x, key);
    return o;
  }

  public int getInt(X x, Object key, int defaultValue) {
    Object o = getX().get(x, key); 
    if ( o == null ) o = localX_.get(x, key);
    if ( o == null ) return defaultValue;
    return (int) o;
  }

  public boolean getBoolean(X x, Object key, boolean defaultValue) {
    Object o = getX().get(x, key); 
    if ( o == null ) o = localX_.get(x, key);
    if ( o == null ) return defaultValue;
    return (boolean) o;
  }
}
