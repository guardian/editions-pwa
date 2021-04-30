#import <Foundation/NSArray.h>
#import <Foundation/NSDictionary.h>
#import <Foundation/NSError.h>
#import <Foundation/NSObject.h>
#import <Foundation/NSSet.h>
#import <Foundation/NSString.h>
#import <Foundation/NSValue.h>

@class OphanMultiplatform_ophanDeviceClass, OphanMultiplatform_ophanOphanDispatcher, OphanOphanApi, OphanKotlinEnum, OphanKotlinThrowable, OphanMultiplatform_ophanApp, OphanMultiplatform_ophanDevice, OphanMultiplatform_ophanEvent, OphanKotlinArray, OphanMultiplatform_ophanProtocol, OphanMultiplatform_ophanEdition, OphanMultiplatform_ophanPlatform, OphanKotlinByteArray, OphanMultiplatform_ophanEventType, OphanMultiplatform_ophanSource, OphanMultiplatform_ophanRenderedAd, OphanMultiplatform_ophanBenchmarkData, OphanMultiplatform_ophanNetworkOperationData, OphanMultiplatform_ophanScrollDepth, OphanMultiplatform_ophanMediaPlayback, OphanMultiplatform_ophanAbTestInfo, OphanMultiplatform_ophanInteraction, OphanMultiplatform_ophanReferrer, OphanMultiplatform_ophanUrl, OphanMultiplatform_ophanComponentEvent, OphanMultiplatform_ophanAcquisition, OphanMultiplatform_ophanTransport, OphanMultiplatform_ophanFieldMetadata, OphanMultiplatform_ophanListMetadata, OphanMultiplatform_ophanMapMetadata, OphanMultiplatform_ophanMessageMetadata, OphanMultiplatform_ophanSetMetadata, OphanMultiplatform_ophanStructMetadata, OphanKotlinByteIterator, OphanMultiplatform_ophanBenchmarkType, OphanMultiplatform_ophanRequestType, OphanMultiplatform_ophanConnectionType, OphanMultiplatform_ophanMediaType, OphanMultiplatform_ophanMediaEvent, OphanMultiplatform_ophanAbTest, OphanMultiplatform_ophanLinkName, OphanMultiplatform_ophanGoogleReferral, OphanMultiplatform_ophanSignificantSite, OphanMultiplatform_ophanComponentV2, OphanMultiplatform_ophanAction, OphanMultiplatform_ophanProduct, OphanMultiplatform_ophanPaymentFrequency, OphanMultiplatform_ophanPaymentProvider, OphanMultiplatform_ophanComponentType, OphanMultiplatform_ophanAcquisitionSource, OphanMultiplatform_ophanPrintOptions, OphanMultiplatform_ophanQueryParameter, OphanMultiplatform_ophanPrintProduct;

@protocol OphanMultiplatform_ophanLogger, OphanKotlinComparable, OphanMultiplatform_ophanRecordStore, OphanKotlinCoroutineContext, OphanMultiplatform_ophanStruct, OphanKotlinCoroutineContextElement, OphanKotlinCoroutineContextKey, OphanKotlinIterator;

NS_ASSUME_NONNULL_BEGIN
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wunknown-warning-option"
#pragma clang diagnostic ignored "-Wnullability"
#pragma clang diagnostic ignored "-Wnullability-completeness"
#pragma clang diagnostic ignored "-Wswift-name-attribute"

@interface KotlinBase : NSObject
- (instancetype)init __attribute__((unavailable));
+ (instancetype)new __attribute__((unavailable));
+ (void)initialize __attribute__((objc_requires_super));
@end;

@interface KotlinBase (KotlinBaseCopying) <NSCopying>
@end;

__attribute__((objc_runtime_name("KotlinMutableSet")))
__attribute__((swift_name("KotlinMutableSet")))
@interface OphanMutableSet<ObjectType> : NSMutableSet<ObjectType>
@end;

__attribute__((objc_runtime_name("KotlinMutableDictionary")))
__attribute__((swift_name("KotlinMutableDictionary")))
@interface OphanMutableDictionary<KeyType, ObjectType> : NSMutableDictionary<KeyType, ObjectType>
@end;

@interface NSError (NSErrorKotlinException)
@property (readonly) id _Nullable kotlinException;
@end;

__attribute__((objc_runtime_name("KotlinNumber")))
__attribute__((swift_name("KotlinNumber")))
@interface OphanNumber : NSNumber
- (instancetype)initWithChar:(char)value __attribute__((unavailable));
- (instancetype)initWithUnsignedChar:(unsigned char)value __attribute__((unavailable));
- (instancetype)initWithShort:(short)value __attribute__((unavailable));
- (instancetype)initWithUnsignedShort:(unsigned short)value __attribute__((unavailable));
- (instancetype)initWithInt:(int)value __attribute__((unavailable));
- (instancetype)initWithUnsignedInt:(unsigned int)value __attribute__((unavailable));
- (instancetype)initWithLong:(long)value __attribute__((unavailable));
- (instancetype)initWithUnsignedLong:(unsigned long)value __attribute__((unavailable));
- (instancetype)initWithLongLong:(long long)value __attribute__((unavailable));
- (instancetype)initWithUnsignedLongLong:(unsigned long long)value __attribute__((unavailable));
- (instancetype)initWithFloat:(float)value __attribute__((unavailable));
- (instancetype)initWithDouble:(double)value __attribute__((unavailable));
- (instancetype)initWithBool:(BOOL)value __attribute__((unavailable));
- (instancetype)initWithInteger:(NSInteger)value __attribute__((unavailable));
- (instancetype)initWithUnsignedInteger:(NSUInteger)value __attribute__((unavailable));
+ (instancetype)numberWithChar:(char)value __attribute__((unavailable));
+ (instancetype)numberWithUnsignedChar:(unsigned char)value __attribute__((unavailable));
+ (instancetype)numberWithShort:(short)value __attribute__((unavailable));
+ (instancetype)numberWithUnsignedShort:(unsigned short)value __attribute__((unavailable));
+ (instancetype)numberWithInt:(int)value __attribute__((unavailable));
+ (instancetype)numberWithUnsignedInt:(unsigned int)value __attribute__((unavailable));
+ (instancetype)numberWithLong:(long)value __attribute__((unavailable));
+ (instancetype)numberWithUnsignedLong:(unsigned long)value __attribute__((unavailable));
+ (instancetype)numberWithLongLong:(long long)value __attribute__((unavailable));
+ (instancetype)numberWithUnsignedLongLong:(unsigned long long)value __attribute__((unavailable));
+ (instancetype)numberWithFloat:(float)value __attribute__((unavailable));
+ (instancetype)numberWithDouble:(double)value __attribute__((unavailable));
+ (instancetype)numberWithBool:(BOOL)value __attribute__((unavailable));
+ (instancetype)numberWithInteger:(NSInteger)value __attribute__((unavailable));
+ (instancetype)numberWithUnsignedInteger:(NSUInteger)value __attribute__((unavailable));
@end;

__attribute__((objc_runtime_name("KotlinByte")))
__attribute__((swift_name("KotlinByte")))
@interface OphanByte : OphanNumber
- (instancetype)initWithChar:(char)value;
+ (instancetype)numberWithChar:(char)value;
@end;

__attribute__((objc_runtime_name("KotlinUByte")))
__attribute__((swift_name("KotlinUByte")))
@interface OphanUByte : OphanNumber
- (instancetype)initWithUnsignedChar:(unsigned char)value;
+ (instancetype)numberWithUnsignedChar:(unsigned char)value;
@end;

__attribute__((objc_runtime_name("KotlinShort")))
__attribute__((swift_name("KotlinShort")))
@interface OphanShort : OphanNumber
- (instancetype)initWithShort:(short)value;
+ (instancetype)numberWithShort:(short)value;
@end;

__attribute__((objc_runtime_name("KotlinUShort")))
__attribute__((swift_name("KotlinUShort")))
@interface OphanUShort : OphanNumber
- (instancetype)initWithUnsignedShort:(unsigned short)value;
+ (instancetype)numberWithUnsignedShort:(unsigned short)value;
@end;

__attribute__((objc_runtime_name("KotlinInt")))
__attribute__((swift_name("KotlinInt")))
@interface OphanInt : OphanNumber
- (instancetype)initWithInt:(int)value;
+ (instancetype)numberWithInt:(int)value;
@end;

__attribute__((objc_runtime_name("KotlinUInt")))
__attribute__((swift_name("KotlinUInt")))
@interface OphanUInt : OphanNumber
- (instancetype)initWithUnsignedInt:(unsigned int)value;
+ (instancetype)numberWithUnsignedInt:(unsigned int)value;
@end;

__attribute__((objc_runtime_name("KotlinLong")))
__attribute__((swift_name("KotlinLong")))
@interface OphanLong : OphanNumber
- (instancetype)initWithLongLong:(long long)value;
+ (instancetype)numberWithLongLong:(long long)value;
@end;

__attribute__((objc_runtime_name("KotlinULong")))
__attribute__((swift_name("KotlinULong")))
@interface OphanULong : OphanNumber
- (instancetype)initWithUnsignedLongLong:(unsigned long long)value;
+ (instancetype)numberWithUnsignedLongLong:(unsigned long long)value;
@end;

__attribute__((objc_runtime_name("KotlinFloat")))
__attribute__((swift_name("KotlinFloat")))
@interface OphanFloat : OphanNumber
- (instancetype)initWithFloat:(float)value;
+ (instancetype)numberWithFloat:(float)value;
@end;

__attribute__((objc_runtime_name("KotlinDouble")))
__attribute__((swift_name("KotlinDouble")))
@interface OphanDouble : OphanNumber
- (instancetype)initWithDouble:(double)value;
+ (instancetype)numberWithDouble:(double)value;
@end;

__attribute__((objc_runtime_name("KotlinBoolean")))
__attribute__((swift_name("KotlinBoolean")))
@interface OphanBoolean : OphanNumber
- (instancetype)initWithBool:(BOOL)value;
+ (instancetype)numberWithBool:(BOOL)value;
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("OphanApi")))
@interface OphanOphanApi : KotlinBase
- (instancetype)initWithAppFamily:(NSString *)appFamily appVersion:(NSString *)appVersion appOsVersion:(NSString *)appOsVersion deviceName:(NSString *)deviceName deviceManufacturer:(NSString *)deviceManufacturer deviceClass:(OphanMultiplatform_ophanDeviceClass * _Nullable)deviceClass deviceId:(NSString *)deviceId userId:(NSString * _Nullable)userId logger:(id<OphanMultiplatform_ophanLogger>)logger recordStorePath:(NSString *)recordStorePath __attribute__((swift_name("init(appFamily:appVersion:appOsVersion:deviceName:deviceManufacturer:deviceClass:deviceId:userId:logger:recordStorePath:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithDispatcher:(OphanMultiplatform_ophanOphanDispatcher *)dispatcher __attribute__((swift_name("init(dispatcher:)"))) __attribute__((objc_designated_initializer));
- (void)sendComponentEventViewId:(NSString * _Nullable)viewId componentType:(NSString *)componentType action:(NSString *)action value:(NSString * _Nullable)value componentId:(NSString * _Nullable)componentId __attribute__((swift_name("sendComponentEvent(viewId:componentType:action:value:componentId:)")));
- (void)sendAppScreenEventViewId:(NSString * _Nullable)viewId screenName:(NSString *)screenName value:(NSString * _Nullable)value __attribute__((swift_name("sendAppScreenEvent(viewId:screenName:value:)")));
- (NSString *)sendPageViewEventPath:(NSString *)path __attribute__((swift_name("sendPageViewEvent(path:)")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("OphanIosKt")))
@interface OphanOphanIosKt : KotlinBase
+ (OphanOphanApi *)getThreadSafeOphanApiAppFamily:(NSString *)appFamily appVersion:(NSString *)appVersion appOsVersion:(NSString *)appOsVersion deviceName:(NSString *)deviceName deviceManufacturer:(NSString *)deviceManufacturer deviceClass:(OphanMultiplatform_ophanDeviceClass * _Nullable)deviceClass deviceId:(NSString *)deviceId userId:(NSString * _Nullable)userId logger:(id<OphanMultiplatform_ophanLogger>)logger recordStorePath:(NSString *)recordStorePath __attribute__((swift_name("getThreadSafeOphanApi(appFamily:appVersion:appOsVersion:deviceName:deviceManufacturer:deviceClass:deviceId:userId:logger:recordStorePath:)")));
@end;

__attribute__((swift_name("KotlinComparable")))
@protocol OphanKotlinComparable
@required
- (int32_t)compareToOther:(id _Nullable)other __attribute__((swift_name("compareTo(other:)")));
@end;

__attribute__((swift_name("KotlinEnum")))
@interface OphanKotlinEnum : KotlinBase <OphanKotlinComparable>
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer));
- (int32_t)compareToOther:(OphanKotlinEnum *)other __attribute__((swift_name("compareTo(other:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) NSString *name __attribute__((swift_name("name")));
@property (readonly) int32_t ordinal __attribute__((swift_name("ordinal")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanDeviceClass")))
@interface OphanMultiplatform_ophanDeviceClass : OphanKotlinEnum
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
@property (class, readonly) OphanMultiplatform_ophanDeviceClass *desktop __attribute__((swift_name("desktop")));
@property (class, readonly) OphanMultiplatform_ophanDeviceClass *anonymized __attribute__((swift_name("anonymized")));
@property (class, readonly) OphanMultiplatform_ophanDeviceClass *mobile __attribute__((swift_name("mobile")));
@property (class, readonly) OphanMultiplatform_ophanDeviceClass *tablet __attribute__((swift_name("tablet")));
@property (class, readonly) OphanMultiplatform_ophanDeviceClass *phone __attribute__((swift_name("phone")));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (int32_t)compareToOther:(OphanMultiplatform_ophanDeviceClass *)other __attribute__((swift_name("compareTo(other:)")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end;

__attribute__((swift_name("Multiplatform_ophanLogger")))
@protocol OphanMultiplatform_ophanLogger
@required
- (void)debugTag:(NSString *)tag message:(NSString *)message __attribute__((swift_name("debug(tag:message:)")));
- (void)warnTag:(NSString *)tag message:(NSString *)message error:(OphanKotlinThrowable * _Nullable)error __attribute__((swift_name("warn(tag:message:error:)")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanOphanDispatcher")))
@interface OphanMultiplatform_ophanOphanDispatcher : KotlinBase
- (instancetype)initWithApp:(OphanMultiplatform_ophanApp *)app device:(OphanMultiplatform_ophanDevice *)device deviceId:(NSString *)deviceId userId:(NSString * _Nullable)userId logger:(id<OphanMultiplatform_ophanLogger> _Nullable)logger recordStore:(id<OphanMultiplatform_ophanRecordStore>)recordStore useDebug:(BOOL)useDebug __attribute__((swift_name("init(app:device:deviceId:userId:logger:recordStore:useDebug:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithApp:(OphanMultiplatform_ophanApp *)app device:(OphanMultiplatform_ophanDevice *)device deviceId:(NSString *)deviceId userId:(NSString * _Nullable)userId logger:(id<OphanMultiplatform_ophanLogger> _Nullable)logger recordStore:(id<OphanMultiplatform_ophanRecordStore>)recordStore coroutineContext:(id<OphanKotlinCoroutineContext>)coroutineContext useDebug:(BOOL)useDebug __attribute__((swift_name("init(app:device:deviceId:userId:logger:recordStore:coroutineContext:useDebug:)"))) __attribute__((objc_designated_initializer));
- (void)dispatchEventEvent:(OphanMultiplatform_ophanEvent *)event __attribute__((swift_name("dispatchEvent(event:)")));
- (void)dispatchEventEvent:(OphanMultiplatform_ophanEvent *)event context:(id<OphanKotlinCoroutineContext>)context __attribute__((swift_name("dispatchEvent(event:context:)")));
@end;

__attribute__((swift_name("KotlinThrowable")))
@interface OphanKotlinThrowable : KotlinBase
- (instancetype)initWithMessage:(NSString * _Nullable)message __attribute__((swift_name("init(message:)"))) __attribute__((objc_designated_initializer));
- (instancetype)initWithCause:(OphanKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(cause:)"))) __attribute__((objc_designated_initializer));
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (instancetype)initWithMessage:(NSString * _Nullable)message cause:(OphanKotlinThrowable * _Nullable)cause __attribute__((swift_name("init(message:cause:)"))) __attribute__((objc_designated_initializer));
- (OphanKotlinArray *)getStackTrace __attribute__((swift_name("getStackTrace()")));
- (void)printStackTrace __attribute__((swift_name("printStackTrace()")));
- (NSString *)description __attribute__((swift_name("description()")));
@property (readonly) OphanKotlinThrowable * _Nullable cause __attribute__((swift_name("cause")));
@property (readonly) NSString * _Nullable message __attribute__((swift_name("message")));
@end;

__attribute__((swift_name("Multiplatform_ophanStruct")))
@protocol OphanMultiplatform_ophanStruct
@required
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanApp")))
@interface OphanMultiplatform_ophanApp : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithVersion:(NSString * _Nullable)version family:(NSString * _Nullable)family os:(NSString * _Nullable)os edition:(OphanMultiplatform_ophanEdition * _Nullable)edition platform:(OphanMultiplatform_ophanPlatform * _Nullable)platform __attribute__((swift_name("init(version:family:os:edition:platform:)"))) __attribute__((objc_designated_initializer));
- (NSString * _Nullable)component1 __attribute__((swift_name("component1()")));
- (NSString * _Nullable)component2 __attribute__((swift_name("component2()")));
- (NSString * _Nullable)component3 __attribute__((swift_name("component3()")));
- (OphanMultiplatform_ophanEdition * _Nullable)component4 __attribute__((swift_name("component4()")));
- (OphanMultiplatform_ophanPlatform * _Nullable)component5 __attribute__((swift_name("component5()")));
- (OphanMultiplatform_ophanApp *)doCopyVersion:(NSString * _Nullable)version family:(NSString * _Nullable)family os:(NSString * _Nullable)os edition:(OphanMultiplatform_ophanEdition * _Nullable)edition platform:(OphanMultiplatform_ophanPlatform * _Nullable)platform __attribute__((swift_name("doCopy(version:family:os:edition:platform:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) OphanMultiplatform_ophanEdition * _Nullable edition __attribute__((swift_name("edition")));
@property (readonly) NSString * _Nullable family __attribute__((swift_name("family")));
@property (readonly) NSString * _Nullable os __attribute__((swift_name("os")));
@property (readonly) OphanMultiplatform_ophanPlatform * _Nullable platform __attribute__((swift_name("platform")));
@property (readonly) NSString * _Nullable version __attribute__((swift_name("version")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanDevice")))
@interface OphanMultiplatform_ophanDevice : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithName:(NSString * _Nullable)name manufacturer:(NSString * _Nullable)manufacturer deviceClass:(OphanMultiplatform_ophanDeviceClass * _Nullable)deviceClass __attribute__((swift_name("init(name:manufacturer:deviceClass:)"))) __attribute__((objc_designated_initializer));
- (NSString * _Nullable)component1 __attribute__((swift_name("component1()")));
- (NSString * _Nullable)component2 __attribute__((swift_name("component2()")));
- (OphanMultiplatform_ophanDeviceClass * _Nullable)component3 __attribute__((swift_name("component3()")));
- (OphanMultiplatform_ophanDevice *)doCopyName:(NSString * _Nullable)name manufacturer:(NSString * _Nullable)manufacturer deviceClass:(OphanMultiplatform_ophanDeviceClass * _Nullable)deviceClass __attribute__((swift_name("doCopy(name:manufacturer:deviceClass:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) OphanMultiplatform_ophanDeviceClass * _Nullable deviceClass __attribute__((swift_name("deviceClass")));
@property (readonly) NSString * _Nullable manufacturer __attribute__((swift_name("manufacturer")));
@property (readonly) NSString * _Nullable name __attribute__((swift_name("name")));
@end;

__attribute__((swift_name("Multiplatform_ophanRecordStore")))
@protocol OphanMultiplatform_ophanRecordStore
@required
- (NSArray<OphanKotlinByteArray *> *)getRecords __attribute__((swift_name("getRecords()")));
- (void)putRecordKey:(NSString *)key record:(OphanKotlinByteArray *)record __attribute__((swift_name("putRecord(key:record:)")));
- (void)removeRecordKey:(NSString *)key __attribute__((swift_name("removeRecord(key:)")));
@end;

__attribute__((swift_name("KotlinCoroutineContext")))
@protocol OphanKotlinCoroutineContext
@required
- (id _Nullable)foldInitial:(id _Nullable)initial operation:(id _Nullable (^)(id _Nullable, id<OphanKotlinCoroutineContextElement>))operation __attribute__((swift_name("fold(initial:operation:)")));
- (id<OphanKotlinCoroutineContextElement> _Nullable)getKey:(id<OphanKotlinCoroutineContextKey>)key __attribute__((swift_name("get(key:)")));
- (id<OphanKotlinCoroutineContext>)minusKeyKey:(id<OphanKotlinCoroutineContextKey>)key __attribute__((swift_name("minusKey(key:)")));
- (id<OphanKotlinCoroutineContext>)plusContext:(id<OphanKotlinCoroutineContext>)context __attribute__((swift_name("plus(context:)")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanEvent")))
@interface OphanMultiplatform_ophanEvent : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithEventType:(OphanMultiplatform_ophanEventType * _Nullable)eventType eventId:(NSString *)eventId viewId:(NSString * _Nullable)viewId ageMsLong:(OphanLong * _Nullable)ageMsLong ageMs:(OphanInt * _Nullable)ageMs path:(NSString * _Nullable)path previousPath:(NSString * _Nullable)previousPath referringSource:(OphanMultiplatform_ophanSource * _Nullable)referringSource pushNotificationId:(NSString * _Nullable)pushNotificationId adLoad:(OphanMultiplatform_ophanRenderedAd * _Nullable)adLoad benchmark:(OphanMultiplatform_ophanBenchmarkData * _Nullable)benchmark networkOperation:(OphanMultiplatform_ophanNetworkOperationData * _Nullable)networkOperation attentionMs:(OphanLong * _Nullable)attentionMs scrollDepth:(OphanMultiplatform_ophanScrollDepth * _Nullable)scrollDepth media:(OphanMultiplatform_ophanMediaPlayback * _Nullable)media ab:(OphanMultiplatform_ophanAbTestInfo * _Nullable)ab interaction:(OphanMultiplatform_ophanInteraction * _Nullable)interaction referrer:(OphanMultiplatform_ophanReferrer * _Nullable)referrer url:(OphanMultiplatform_ophanUrl * _Nullable)url renderedComponents:(NSArray<NSString *> * _Nullable)renderedComponents componentEvent:(OphanMultiplatform_ophanComponentEvent * _Nullable)componentEvent acquisition:(OphanMultiplatform_ophanAcquisition * _Nullable)acquisition __attribute__((swift_name("init(eventType:eventId:viewId:ageMsLong:ageMs:path:previousPath:referringSource:pushNotificationId:adLoad:benchmark:networkOperation:attentionMs:scrollDepth:media:ab:interaction:referrer:url:renderedComponents:componentEvent:acquisition:)"))) __attribute__((objc_designated_initializer));
- (OphanMultiplatform_ophanEventType * _Nullable)component1 __attribute__((swift_name("component1()")));
- (OphanMultiplatform_ophanRenderedAd * _Nullable)component10 __attribute__((swift_name("component10()")));
- (OphanMultiplatform_ophanBenchmarkData * _Nullable)component11 __attribute__((swift_name("component11()")));
- (OphanMultiplatform_ophanNetworkOperationData * _Nullable)component12 __attribute__((swift_name("component12()")));
- (OphanLong * _Nullable)component13 __attribute__((swift_name("component13()")));
- (OphanMultiplatform_ophanScrollDepth * _Nullable)component14 __attribute__((swift_name("component14()")));
- (OphanMultiplatform_ophanMediaPlayback * _Nullable)component15 __attribute__((swift_name("component15()")));
- (OphanMultiplatform_ophanAbTestInfo * _Nullable)component16 __attribute__((swift_name("component16()")));
- (OphanMultiplatform_ophanInteraction * _Nullable)component17 __attribute__((swift_name("component17()")));
- (OphanMultiplatform_ophanReferrer * _Nullable)component18 __attribute__((swift_name("component18()")));
- (OphanMultiplatform_ophanUrl * _Nullable)component19 __attribute__((swift_name("component19()")));
- (NSString *)component2 __attribute__((swift_name("component2()")));
- (NSArray<NSString *> * _Nullable)component20 __attribute__((swift_name("component20()")));
- (OphanMultiplatform_ophanComponentEvent * _Nullable)component21 __attribute__((swift_name("component21()")));
- (OphanMultiplatform_ophanAcquisition * _Nullable)component22 __attribute__((swift_name("component22()")));
- (NSString * _Nullable)component3 __attribute__((swift_name("component3()")));
- (OphanLong * _Nullable)component4 __attribute__((swift_name("component4()")));
- (OphanInt * _Nullable)component5 __attribute__((swift_name("component5()")));
- (NSString * _Nullable)component6 __attribute__((swift_name("component6()")));
- (NSString * _Nullable)component7 __attribute__((swift_name("component7()")));
- (OphanMultiplatform_ophanSource * _Nullable)component8 __attribute__((swift_name("component8()")));
- (NSString * _Nullable)component9 __attribute__((swift_name("component9()")));
- (OphanMultiplatform_ophanEvent *)doCopyEventType:(OphanMultiplatform_ophanEventType * _Nullable)eventType eventId:(NSString *)eventId viewId:(NSString * _Nullable)viewId ageMsLong:(OphanLong * _Nullable)ageMsLong ageMs:(OphanInt * _Nullable)ageMs path:(NSString * _Nullable)path previousPath:(NSString * _Nullable)previousPath referringSource:(OphanMultiplatform_ophanSource * _Nullable)referringSource pushNotificationId:(NSString * _Nullable)pushNotificationId adLoad:(OphanMultiplatform_ophanRenderedAd * _Nullable)adLoad benchmark:(OphanMultiplatform_ophanBenchmarkData * _Nullable)benchmark networkOperation:(OphanMultiplatform_ophanNetworkOperationData * _Nullable)networkOperation attentionMs:(OphanLong * _Nullable)attentionMs scrollDepth:(OphanMultiplatform_ophanScrollDepth * _Nullable)scrollDepth media:(OphanMultiplatform_ophanMediaPlayback * _Nullable)media ab:(OphanMultiplatform_ophanAbTestInfo * _Nullable)ab interaction:(OphanMultiplatform_ophanInteraction * _Nullable)interaction referrer:(OphanMultiplatform_ophanReferrer * _Nullable)referrer url:(OphanMultiplatform_ophanUrl * _Nullable)url renderedComponents:(NSArray<NSString *> * _Nullable)renderedComponents componentEvent:(OphanMultiplatform_ophanComponentEvent * _Nullable)componentEvent acquisition:(OphanMultiplatform_ophanAcquisition * _Nullable)acquisition __attribute__((swift_name("doCopy(eventType:eventId:viewId:ageMsLong:ageMs:path:previousPath:referringSource:pushNotificationId:adLoad:benchmark:networkOperation:attentionMs:scrollDepth:media:ab:interaction:referrer:url:renderedComponents:componentEvent:acquisition:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) OphanMultiplatform_ophanAbTestInfo * _Nullable ab __attribute__((swift_name("ab")));
@property (readonly) OphanMultiplatform_ophanAcquisition * _Nullable acquisition __attribute__((swift_name("acquisition")));
@property (readonly) OphanMultiplatform_ophanRenderedAd * _Nullable adLoad __attribute__((swift_name("adLoad")));
@property (readonly) OphanInt * _Nullable ageMs __attribute__((swift_name("ageMs")));
@property (readonly) OphanLong * _Nullable ageMsLong __attribute__((swift_name("ageMsLong")));
@property (readonly) OphanLong * _Nullable attentionMs __attribute__((swift_name("attentionMs")));
@property (readonly) OphanMultiplatform_ophanBenchmarkData * _Nullable benchmark __attribute__((swift_name("benchmark")));
@property (readonly) OphanMultiplatform_ophanComponentEvent * _Nullable componentEvent __attribute__((swift_name("componentEvent")));
@property (readonly) NSString *eventId __attribute__((swift_name("eventId")));
@property (readonly) OphanMultiplatform_ophanEventType * _Nullable eventType __attribute__((swift_name("eventType")));
@property (readonly) OphanMultiplatform_ophanInteraction * _Nullable interaction __attribute__((swift_name("interaction")));
@property (readonly) OphanMultiplatform_ophanMediaPlayback * _Nullable media __attribute__((swift_name("media")));
@property (readonly) OphanMultiplatform_ophanNetworkOperationData * _Nullable networkOperation __attribute__((swift_name("networkOperation")));
@property (readonly) NSString * _Nullable path __attribute__((swift_name("path")));
@property (readonly) NSString * _Nullable previousPath __attribute__((swift_name("previousPath")));
@property (readonly) NSString * _Nullable pushNotificationId __attribute__((swift_name("pushNotificationId")));
@property (readonly) OphanMultiplatform_ophanReferrer * _Nullable referrer __attribute__((swift_name("referrer")));
@property (readonly) OphanMultiplatform_ophanSource * _Nullable referringSource __attribute__((swift_name("referringSource")));
@property (readonly) NSArray<NSString *> * _Nullable renderedComponents __attribute__((swift_name("renderedComponents")));
@property (readonly) OphanMultiplatform_ophanScrollDepth * _Nullable scrollDepth __attribute__((swift_name("scrollDepth")));
@property (readonly) OphanMultiplatform_ophanUrl * _Nullable url __attribute__((swift_name("url")));
@property (readonly) NSString * _Nullable viewId __attribute__((swift_name("viewId")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinArray")))
@interface OphanKotlinArray : KotlinBase
+ (instancetype)arrayWithSize:(int32_t)size init:(id _Nullable (^)(OphanInt *))init __attribute__((swift_name("init(size:init:)")));
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (id _Nullable)getIndex:(int32_t)index __attribute__((swift_name("get(index:)")));
- (id<OphanKotlinIterator>)iterator __attribute__((swift_name("iterator()")));
- (void)setIndex:(int32_t)index value:(id _Nullable)value __attribute__((swift_name("set(index:value:)")));
@property (readonly) int32_t size __attribute__((swift_name("size")));
@end;

__attribute__((swift_name("Multiplatform_ophanProtocol")))
@interface OphanMultiplatform_ophanProtocol : KotlinBase
- (instancetype)initWithTransport:(OphanMultiplatform_ophanTransport *)transport __attribute__((swift_name("init(transport:)"))) __attribute__((objc_designated_initializer));
- (void)close __attribute__((swift_name("close()")));
- (void)flush __attribute__((swift_name("flush()")));
- (OphanKotlinByteArray *)readBinary __attribute__((swift_name("readBinary()")));
- (BOOL)readBool __attribute__((swift_name("readBool()")));
- (int8_t)readByte __attribute__((swift_name("readByte()")));
- (double)readDouble __attribute__((swift_name("readDouble()")));
- (OphanMultiplatform_ophanFieldMetadata *)readFieldBegin __attribute__((swift_name("readFieldBegin()")));
- (void)readFieldEnd __attribute__((swift_name("readFieldEnd()")));
- (int16_t)readI16 __attribute__((swift_name("readI16()")));
- (int32_t)readI32 __attribute__((swift_name("readI32()")));
- (int64_t)readI64 __attribute__((swift_name("readI64()")));
- (OphanMultiplatform_ophanListMetadata *)readListBegin __attribute__((swift_name("readListBegin()")));
- (void)readListEnd __attribute__((swift_name("readListEnd()")));
- (OphanMultiplatform_ophanMapMetadata *)readMapBegin __attribute__((swift_name("readMapBegin()")));
- (void)readMapEnd __attribute__((swift_name("readMapEnd()")));
- (OphanMultiplatform_ophanMessageMetadata *)readMessageBegin __attribute__((swift_name("readMessageBegin()")));
- (void)readMessageEnd __attribute__((swift_name("readMessageEnd()")));
- (OphanMultiplatform_ophanSetMetadata *)readSetBegin __attribute__((swift_name("readSetBegin()")));
- (void)readSetEnd __attribute__((swift_name("readSetEnd()")));
- (NSString *)readString __attribute__((swift_name("readString()")));
- (OphanMultiplatform_ophanStructMetadata *)readStructBegin __attribute__((swift_name("readStructBegin()")));
- (void)readStructEnd __attribute__((swift_name("readStructEnd()")));
- (void)reset __attribute__((swift_name("reset()")));
- (void)writeBinaryBuf:(OphanKotlinByteArray *)buf __attribute__((swift_name("writeBinary(buf:)")));
- (void)writeBoolB:(BOOL)b __attribute__((swift_name("writeBool(b:)")));
- (void)writeByteB:(int8_t)b __attribute__((swift_name("writeByte(b:)")));
- (void)writeDoubleDub:(double)dub __attribute__((swift_name("writeDouble(dub:)")));
- (void)writeFieldBeginFieldName:(NSString *)fieldName fieldId:(int32_t)fieldId typeId:(int8_t)typeId __attribute__((swift_name("writeFieldBegin(fieldName:fieldId:typeId:)")));
- (void)writeFieldEnd __attribute__((swift_name("writeFieldEnd()")));
- (void)writeFieldStop __attribute__((swift_name("writeFieldStop()")));
- (void)writeI16I16:(int16_t)i16 __attribute__((swift_name("writeI16(i16:)")));
- (void)writeI32I32:(int32_t)i32 __attribute__((swift_name("writeI32(i32:)")));
- (void)writeI64I64:(int64_t)i64 __attribute__((swift_name("writeI64(i64:)")));
- (void)writeListBeginElementTypeId:(int8_t)elementTypeId listSize:(int32_t)listSize __attribute__((swift_name("writeListBegin(elementTypeId:listSize:)")));
- (void)writeListEnd __attribute__((swift_name("writeListEnd()")));
- (void)writeMapBeginKeyTypeId:(int8_t)keyTypeId valueTypeId:(int8_t)valueTypeId mapSize:(int32_t)mapSize __attribute__((swift_name("writeMapBegin(keyTypeId:valueTypeId:mapSize:)")));
- (void)writeMapEnd __attribute__((swift_name("writeMapEnd()")));
- (void)writeMessageBeginName:(NSString *)name typeId:(int8_t)typeId seqId:(int32_t)seqId __attribute__((swift_name("writeMessageBegin(name:typeId:seqId:)")));
- (void)writeMessageEnd __attribute__((swift_name("writeMessageEnd()")));
- (void)writeSetBeginElementTypeId:(int8_t)elementTypeId setSize:(int32_t)setSize __attribute__((swift_name("writeSetBegin(elementTypeId:setSize:)")));
- (void)writeSetEnd __attribute__((swift_name("writeSetEnd()")));
- (void)writeStringStr:(NSString *)str __attribute__((swift_name("writeString(str:)")));
- (void)writeStructBeginStructName:(NSString *)structName __attribute__((swift_name("writeStructBegin(structName:)")));
- (void)writeStructEnd __attribute__((swift_name("writeStructEnd()")));
@property (readonly) OphanMultiplatform_ophanTransport *transport __attribute__((swift_name("transport")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanEdition")))
@interface OphanMultiplatform_ophanEdition : OphanKotlinEnum
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
@property (class, readonly) OphanMultiplatform_ophanEdition *uk __attribute__((swift_name("uk")));
@property (class, readonly) OphanMultiplatform_ophanEdition *us __attribute__((swift_name("us")));
@property (class, readonly) OphanMultiplatform_ophanEdition *au __attribute__((swift_name("au")));
@property (class, readonly) OphanMultiplatform_ophanEdition *international __attribute__((swift_name("international")));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (int32_t)compareToOther:(OphanMultiplatform_ophanEdition *)other __attribute__((swift_name("compareTo(other:)")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanPlatform")))
@interface OphanMultiplatform_ophanPlatform : OphanKotlinEnum
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
@property (class, readonly) OphanMultiplatform_ophanPlatform *r2 __attribute__((swift_name("r2")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *nextGen __attribute__((swift_name("nextGen")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *iosNativeApp __attribute__((swift_name("iosNativeApp")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *androidNativeApp __attribute__((swift_name("androidNativeApp")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *embed __attribute__((swift_name("embed")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *membership __attribute__((swift_name("membership")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *facebookInstantArticle __attribute__((swift_name("facebookInstantArticle")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *amp __attribute__((swift_name("amp")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *witness __attribute__((swift_name("witness")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *jobs __attribute__((swift_name("jobs")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *contribution __attribute__((swift_name("contribution")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *yahoo __attribute__((swift_name("yahoo")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *amazonEcho __attribute__((swift_name("amazonEcho")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *appleNews __attribute__((swift_name("appleNews")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *windowsNativeApp __attribute__((swift_name("windowsNativeApp")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *scribd __attribute__((swift_name("scribd")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *support __attribute__((swift_name("support")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *subscribe __attribute__((swift_name("subscribe")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *manageMyAccount __attribute__((swift_name("manageMyAccount")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *smartNews __attribute__((swift_name("smartNews")));
@property (class, readonly) OphanMultiplatform_ophanPlatform *editions __attribute__((swift_name("editions")));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (int32_t)compareToOther:(OphanMultiplatform_ophanPlatform *)other __attribute__((swift_name("compareTo(other:)")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("KotlinByteArray")))
@interface OphanKotlinByteArray : KotlinBase
+ (instancetype)arrayWithSize:(int32_t)size __attribute__((swift_name("init(size:)")));
+ (instancetype)arrayWithSize:(int32_t)size init:(OphanByte *(^)(OphanInt *))init __attribute__((swift_name("init(size:init:)")));
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
- (int8_t)getIndex:(int32_t)index __attribute__((swift_name("get(index:)")));
- (OphanKotlinByteIterator *)iterator __attribute__((swift_name("iterator()")));
- (void)setIndex:(int32_t)index value:(int8_t)value __attribute__((swift_name("set(index:value:)")));
@property (readonly) int32_t size __attribute__((swift_name("size")));
@end;

__attribute__((swift_name("KotlinCoroutineContextElement")))
@protocol OphanKotlinCoroutineContextElement <OphanKotlinCoroutineContext>
@required
@property (readonly) id<OphanKotlinCoroutineContextKey> key __attribute__((swift_name("key")));
@end;

__attribute__((swift_name("KotlinCoroutineContextKey")))
@protocol OphanKotlinCoroutineContextKey
@required
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanEventType")))
@interface OphanMultiplatform_ophanEventType : OphanKotlinEnum
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
@property (class, readonly) OphanMultiplatform_ophanEventType *view __attribute__((swift_name("view")));
@property (class, readonly) OphanMultiplatform_ophanEventType *adLoad __attribute__((swift_name("adLoad")));
@property (class, readonly) OphanMultiplatform_ophanEventType *performance __attribute__((swift_name("performance")));
@property (class, readonly) OphanMultiplatform_ophanEventType *network __attribute__((swift_name("network")));
@property (class, readonly) OphanMultiplatform_ophanEventType *interaction __attribute__((swift_name("interaction")));
@property (class, readonly) OphanMultiplatform_ophanEventType *abTest __attribute__((swift_name("abTest")));
@property (class, readonly) OphanMultiplatform_ophanEventType *componentEvent __attribute__((swift_name("componentEvent")));
@property (class, readonly) OphanMultiplatform_ophanEventType *acquisition __attribute__((swift_name("acquisition")));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (int32_t)compareToOther:(OphanMultiplatform_ophanEventType *)other __attribute__((swift_name("compareTo(other:)")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanSource")))
@interface OphanMultiplatform_ophanSource : OphanKotlinEnum
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
@property (class, readonly) OphanMultiplatform_ophanSource *frontOrSection __attribute__((swift_name("frontOrSection")));
@property (class, readonly) OphanMultiplatform_ophanSource *fixturesPage __attribute__((swift_name("fixturesPage")));
@property (class, readonly) OphanMultiplatform_ophanSource *swipe __attribute__((swift_name("swipe")));
@property (class, readonly) OphanMultiplatform_ophanSource *inArticleLink __attribute__((swift_name("inArticleLink")));
@property (class, readonly) OphanMultiplatform_ophanSource *externalLink __attribute__((swift_name("externalLink")));
@property (class, readonly) OphanMultiplatform_ophanSource *relatedArticleLink __attribute__((swift_name("relatedArticleLink")));
@property (class, readonly) OphanMultiplatform_ophanSource *push __attribute__((swift_name("push")));
@property (class, readonly) OphanMultiplatform_ophanSource *handoffWeb __attribute__((swift_name("handoffWeb")));
@property (class, readonly) OphanMultiplatform_ophanSource *handoffApp __attribute__((swift_name("handoffApp")));
@property (class, readonly) OphanMultiplatform_ophanSource *widget __attribute__((swift_name("widget")));
@property (class, readonly) OphanMultiplatform_ophanSource *resumeMedia __attribute__((swift_name("resumeMedia")));
@property (class, readonly) OphanMultiplatform_ophanSource *back __attribute__((swift_name("back")));
@property (class, readonly) OphanMultiplatform_ophanSource *search __attribute__((swift_name("search")));
@property (class, readonly) OphanMultiplatform_ophanSource *spotlight __attribute__((swift_name("spotlight")));
@property (class, readonly) OphanMultiplatform_ophanSource *stateRestoration __attribute__((swift_name("stateRestoration")));
@property (class, readonly) OphanMultiplatform_ophanSource *pushBreakingNews __attribute__((swift_name("pushBreakingNews")));
@property (class, readonly) OphanMultiplatform_ophanSource *pushFollowTag __attribute__((swift_name("pushFollowTag")));
@property (class, readonly) OphanMultiplatform_ophanSource *pushOther __attribute__((swift_name("pushOther")));
@property (class, readonly) OphanMultiplatform_ophanSource *discover __attribute__((swift_name("discover")));
@property (class, readonly) OphanMultiplatform_ophanSource *membership __attribute__((swift_name("membership")));
@property (class, readonly) OphanMultiplatform_ophanSource *homeScreen __attribute__((swift_name("homeScreen")));
@property (class, readonly) OphanMultiplatform_ophanSource *navigation __attribute__((swift_name("navigation")));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (int32_t)compareToOther:(OphanMultiplatform_ophanSource *)other __attribute__((swift_name("compareTo(other:)")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanRenderedAd")))
@interface OphanMultiplatform_ophanRenderedAd : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithSlot:(NSString *)slot lineItemId:(OphanLong * _Nullable)lineItemId creativeId:(OphanLong * _Nullable)creativeId timeToRenderEndedMs:(OphanLong * _Nullable)timeToRenderEndedMs timeToAdRequestMs:(OphanLong * _Nullable)timeToAdRequestMs adRetrievalTimeMs:(OphanLong * _Nullable)adRetrievalTimeMs adRenderTimeMs:(OphanLong * _Nullable)adRenderTimeMs __attribute__((swift_name("init(slot:lineItemId:creativeId:timeToRenderEndedMs:timeToAdRequestMs:adRetrievalTimeMs:adRenderTimeMs:)"))) __attribute__((objc_designated_initializer));
- (NSString *)component1 __attribute__((swift_name("component1()")));
- (OphanLong * _Nullable)component2 __attribute__((swift_name("component2()")));
- (OphanLong * _Nullable)component3 __attribute__((swift_name("component3()")));
- (OphanLong * _Nullable)component4 __attribute__((swift_name("component4()")));
- (OphanLong * _Nullable)component5 __attribute__((swift_name("component5()")));
- (OphanLong * _Nullable)component6 __attribute__((swift_name("component6()")));
- (OphanLong * _Nullable)component7 __attribute__((swift_name("component7()")));
- (OphanMultiplatform_ophanRenderedAd *)doCopySlot:(NSString *)slot lineItemId:(OphanLong * _Nullable)lineItemId creativeId:(OphanLong * _Nullable)creativeId timeToRenderEndedMs:(OphanLong * _Nullable)timeToRenderEndedMs timeToAdRequestMs:(OphanLong * _Nullable)timeToAdRequestMs adRetrievalTimeMs:(OphanLong * _Nullable)adRetrievalTimeMs adRenderTimeMs:(OphanLong * _Nullable)adRenderTimeMs __attribute__((swift_name("doCopy(slot:lineItemId:creativeId:timeToRenderEndedMs:timeToAdRequestMs:adRetrievalTimeMs:adRenderTimeMs:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) OphanLong * _Nullable adRenderTimeMs __attribute__((swift_name("adRenderTimeMs")));
@property (readonly) OphanLong * _Nullable adRetrievalTimeMs __attribute__((swift_name("adRetrievalTimeMs")));
@property (readonly) OphanLong * _Nullable creativeId __attribute__((swift_name("creativeId")));
@property (readonly) OphanLong * _Nullable lineItemId __attribute__((swift_name("lineItemId")));
@property (readonly) NSString *slot __attribute__((swift_name("slot")));
@property (readonly) OphanLong * _Nullable timeToAdRequestMs __attribute__((swift_name("timeToAdRequestMs")));
@property (readonly) OphanLong * _Nullable timeToRenderEndedMs __attribute__((swift_name("timeToRenderEndedMs")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanBenchmarkData")))
@interface OphanMultiplatform_ophanBenchmarkData : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithType:(OphanMultiplatform_ophanBenchmarkType *)type measuredTimeMs:(int64_t)measuredTimeMs __attribute__((swift_name("init(type:measuredTimeMs:)"))) __attribute__((objc_designated_initializer));
- (OphanMultiplatform_ophanBenchmarkType *)component1 __attribute__((swift_name("component1()")));
- (int64_t)component2 __attribute__((swift_name("component2()")));
- (OphanMultiplatform_ophanBenchmarkData *)doCopyType:(OphanMultiplatform_ophanBenchmarkType *)type measuredTimeMs:(int64_t)measuredTimeMs __attribute__((swift_name("doCopy(type:measuredTimeMs:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) int64_t measuredTimeMs __attribute__((swift_name("measuredTimeMs")));
@property (readonly) OphanMultiplatform_ophanBenchmarkType *type __attribute__((swift_name("type")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanNetworkOperationData")))
@interface OphanMultiplatform_ophanNetworkOperationData : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithRequestType:(OphanMultiplatform_ophanRequestType *)requestType measuredTimeMs:(int64_t)measuredTimeMs connectionType:(OphanMultiplatform_ophanConnectionType * _Nullable)connectionType success:(BOOL)success __attribute__((swift_name("init(requestType:measuredTimeMs:connectionType:success:)"))) __attribute__((objc_designated_initializer));
- (OphanMultiplatform_ophanRequestType *)component1 __attribute__((swift_name("component1()")));
- (int64_t)component2 __attribute__((swift_name("component2()")));
- (OphanMultiplatform_ophanConnectionType * _Nullable)component3 __attribute__((swift_name("component3()")));
- (BOOL)component4 __attribute__((swift_name("component4()")));
- (OphanMultiplatform_ophanNetworkOperationData *)doCopyRequestType:(OphanMultiplatform_ophanRequestType *)requestType measuredTimeMs:(int64_t)measuredTimeMs connectionType:(OphanMultiplatform_ophanConnectionType * _Nullable)connectionType success:(BOOL)success __attribute__((swift_name("doCopy(requestType:measuredTimeMs:connectionType:success:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) OphanMultiplatform_ophanConnectionType * _Nullable connectionType __attribute__((swift_name("connectionType")));
@property (readonly) int64_t measuredTimeMs __attribute__((swift_name("measuredTimeMs")));
@property (readonly) OphanMultiplatform_ophanRequestType *requestType __attribute__((swift_name("requestType")));
@property (readonly) BOOL success __attribute__((swift_name("success")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanScrollDepth")))
@interface OphanMultiplatform_ophanScrollDepth : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithMaxExtent:(int32_t)maxExtent numberOfContainers:(OphanInt * _Nullable)numberOfContainers numberOfContainersViewed:(OphanInt * _Nullable)numberOfContainersViewed __attribute__((swift_name("init(maxExtent:numberOfContainers:numberOfContainersViewed:)"))) __attribute__((objc_designated_initializer));
- (int32_t)component1 __attribute__((swift_name("component1()")));
- (OphanInt * _Nullable)component2 __attribute__((swift_name("component2()")));
- (OphanInt * _Nullable)component3 __attribute__((swift_name("component3()")));
- (OphanMultiplatform_ophanScrollDepth *)doCopyMaxExtent:(int32_t)maxExtent numberOfContainers:(OphanInt * _Nullable)numberOfContainers numberOfContainersViewed:(OphanInt * _Nullable)numberOfContainersViewed __attribute__((swift_name("doCopy(maxExtent:numberOfContainers:numberOfContainersViewed:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) int32_t maxExtent __attribute__((swift_name("maxExtent")));
@property (readonly) OphanInt * _Nullable numberOfContainers __attribute__((swift_name("numberOfContainers")));
@property (readonly) OphanInt * _Nullable numberOfContainersViewed __attribute__((swift_name("numberOfContainersViewed")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanMediaPlayback")))
@interface OphanMultiplatform_ophanMediaPlayback : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithMediaId:(NSString *)mediaId mediaType:(OphanMultiplatform_ophanMediaType *)mediaType preroll:(BOOL)preroll eventType:(OphanMultiplatform_ophanMediaEvent *)eventType __attribute__((swift_name("init(mediaId:mediaType:preroll:eventType:)"))) __attribute__((objc_designated_initializer));
- (NSString *)component1 __attribute__((swift_name("component1()")));
- (OphanMultiplatform_ophanMediaType *)component2 __attribute__((swift_name("component2()")));
- (BOOL)component3 __attribute__((swift_name("component3()")));
- (OphanMultiplatform_ophanMediaEvent *)component4 __attribute__((swift_name("component4()")));
- (OphanMultiplatform_ophanMediaPlayback *)doCopyMediaId:(NSString *)mediaId mediaType:(OphanMultiplatform_ophanMediaType *)mediaType preroll:(BOOL)preroll eventType:(OphanMultiplatform_ophanMediaEvent *)eventType __attribute__((swift_name("doCopy(mediaId:mediaType:preroll:eventType:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) OphanMultiplatform_ophanMediaEvent *eventType __attribute__((swift_name("eventType")));
@property (readonly) NSString *mediaId __attribute__((swift_name("mediaId")));
@property (readonly) OphanMultiplatform_ophanMediaType *mediaType __attribute__((swift_name("mediaType")));
@property (readonly) BOOL preroll __attribute__((swift_name("preroll")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanAbTestInfo")))
@interface OphanMultiplatform_ophanAbTestInfo : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithTests:(NSSet<OphanMultiplatform_ophanAbTest *> *)tests __attribute__((swift_name("init(tests:)"))) __attribute__((objc_designated_initializer));
- (NSSet<OphanMultiplatform_ophanAbTest *> *)component1 __attribute__((swift_name("component1()")));
- (OphanMultiplatform_ophanAbTestInfo *)doCopyTests:(NSSet<OphanMultiplatform_ophanAbTest *> *)tests __attribute__((swift_name("doCopy(tests:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) NSSet<OphanMultiplatform_ophanAbTest *> *tests __attribute__((swift_name("tests")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanInteraction")))
@interface OphanMultiplatform_ophanInteraction : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithComponent:(NSString *)component value:(NSString * _Nullable)value atomId:(NSString * _Nullable)atomId __attribute__((swift_name("init(component:value:atomId:)"))) __attribute__((objc_designated_initializer));
- (NSString *)component1 __attribute__((swift_name("component1()")));
- (NSString * _Nullable)component2 __attribute__((swift_name("component2()")));
- (NSString * _Nullable)component3 __attribute__((swift_name("component3()")));
- (OphanMultiplatform_ophanInteraction *)doCopyComponent:(NSString *)component value:(NSString * _Nullable)value atomId:(NSString * _Nullable)atomId __attribute__((swift_name("doCopy(component:value:atomId:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) NSString * _Nullable atomId __attribute__((swift_name("atomId")));
@property (readonly) NSString *component __attribute__((swift_name("component")));
@property (readonly) NSString * _Nullable value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanReferrer")))
@interface OphanMultiplatform_ophanReferrer : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithUrl:(OphanMultiplatform_ophanUrl * _Nullable)url component:(NSString * _Nullable)component linkName:(OphanMultiplatform_ophanLinkName * _Nullable)linkName platform:(OphanMultiplatform_ophanPlatform * _Nullable)platform viewId:(NSString * _Nullable)viewId email:(NSString * _Nullable)email nativeAppSource:(OphanMultiplatform_ophanSource * _Nullable)nativeAppSource google:(OphanMultiplatform_ophanGoogleReferral * _Nullable)google tagIdFollowed:(NSString * _Nullable)tagIdFollowed __attribute__((swift_name("init(url:component:linkName:platform:viewId:email:nativeAppSource:google:tagIdFollowed:)"))) __attribute__((objc_designated_initializer));
- (OphanMultiplatform_ophanUrl * _Nullable)component1 __attribute__((swift_name("component1()")));
- (NSString * _Nullable)component2 __attribute__((swift_name("component2()")));
- (OphanMultiplatform_ophanLinkName * _Nullable)component3 __attribute__((swift_name("component3()")));
- (OphanMultiplatform_ophanPlatform * _Nullable)component4 __attribute__((swift_name("component4()")));
- (NSString * _Nullable)component5 __attribute__((swift_name("component5()")));
- (NSString * _Nullable)component6 __attribute__((swift_name("component6()")));
- (OphanMultiplatform_ophanSource * _Nullable)component7 __attribute__((swift_name("component7()")));
- (OphanMultiplatform_ophanGoogleReferral * _Nullable)component8 __attribute__((swift_name("component8()")));
- (NSString * _Nullable)component9 __attribute__((swift_name("component9()")));
- (OphanMultiplatform_ophanReferrer *)doCopyUrl:(OphanMultiplatform_ophanUrl * _Nullable)url component:(NSString * _Nullable)component linkName:(OphanMultiplatform_ophanLinkName * _Nullable)linkName platform:(OphanMultiplatform_ophanPlatform * _Nullable)platform viewId:(NSString * _Nullable)viewId email:(NSString * _Nullable)email nativeAppSource:(OphanMultiplatform_ophanSource * _Nullable)nativeAppSource google:(OphanMultiplatform_ophanGoogleReferral * _Nullable)google tagIdFollowed:(NSString * _Nullable)tagIdFollowed __attribute__((swift_name("doCopy(url:component:linkName:platform:viewId:email:nativeAppSource:google:tagIdFollowed:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) NSString * _Nullable component __attribute__((swift_name("component")));
@property (readonly) NSString * _Nullable email __attribute__((swift_name("email")));
@property (readonly) OphanMultiplatform_ophanGoogleReferral * _Nullable google __attribute__((swift_name("google")));
@property (readonly) OphanMultiplatform_ophanLinkName * _Nullable linkName __attribute__((swift_name("linkName")));
@property (readonly) OphanMultiplatform_ophanSource * _Nullable nativeAppSource __attribute__((swift_name("nativeAppSource")));
@property (readonly) OphanMultiplatform_ophanPlatform * _Nullable platform __attribute__((swift_name("platform")));
@property (readonly) NSString * _Nullable tagIdFollowed __attribute__((swift_name("tagIdFollowed")));
@property (readonly) OphanMultiplatform_ophanUrl * _Nullable url __attribute__((swift_name("url")));
@property (readonly) NSString * _Nullable viewId __attribute__((swift_name("viewId")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanUrl")))
@interface OphanMultiplatform_ophanUrl : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithRaw:(NSString *)raw host:(NSString *)host domain:(NSString *)domain path:(NSString *)path site:(OphanMultiplatform_ophanSignificantSite * _Nullable)site synthesised:(OphanBoolean * _Nullable)synthesised __attribute__((swift_name("init(raw:host:domain:path:site:synthesised:)"))) __attribute__((objc_designated_initializer));
- (NSString *)component1 __attribute__((swift_name("component1()")));
- (NSString *)component2 __attribute__((swift_name("component2()")));
- (NSString *)component3 __attribute__((swift_name("component3()")));
- (NSString *)component4 __attribute__((swift_name("component4()")));
- (OphanMultiplatform_ophanSignificantSite * _Nullable)component5 __attribute__((swift_name("component5()")));
- (OphanBoolean * _Nullable)component6 __attribute__((swift_name("component6()")));
- (OphanMultiplatform_ophanUrl *)doCopyRaw:(NSString *)raw host:(NSString *)host domain:(NSString *)domain path:(NSString *)path site:(OphanMultiplatform_ophanSignificantSite * _Nullable)site synthesised:(OphanBoolean * _Nullable)synthesised __attribute__((swift_name("doCopy(raw:host:domain:path:site:synthesised:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) NSString *domain __attribute__((swift_name("domain")));
@property (readonly) NSString *host __attribute__((swift_name("host")));
@property (readonly) NSString *path __attribute__((swift_name("path")));
@property (readonly) NSString *raw __attribute__((swift_name("raw")));
@property (readonly) OphanMultiplatform_ophanSignificantSite * _Nullable site __attribute__((swift_name("site")));
@property (readonly) OphanBoolean * _Nullable synthesised __attribute__((swift_name("synthesised")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanComponentEvent")))
@interface OphanMultiplatform_ophanComponentEvent : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithComponent:(OphanMultiplatform_ophanComponentV2 *)component action:(OphanMultiplatform_ophanAction *)action value:(NSString * _Nullable)value id:(NSString * _Nullable)id abTest:(OphanMultiplatform_ophanAbTest * _Nullable)abTest __attribute__((swift_name("init(component:action:value:id:abTest:)"))) __attribute__((objc_designated_initializer));
- (OphanMultiplatform_ophanComponentV2 *)component1 __attribute__((swift_name("component1()")));
- (OphanMultiplatform_ophanAction *)component2 __attribute__((swift_name("component2()")));
- (NSString * _Nullable)component3 __attribute__((swift_name("component3()")));
- (NSString * _Nullable)component4 __attribute__((swift_name("component4()")));
- (OphanMultiplatform_ophanAbTest * _Nullable)component5 __attribute__((swift_name("component5()")));
- (OphanMultiplatform_ophanComponentEvent *)doCopyComponent:(OphanMultiplatform_ophanComponentV2 *)component action:(OphanMultiplatform_ophanAction *)action value:(NSString * _Nullable)value id:(NSString * _Nullable)id abTest:(OphanMultiplatform_ophanAbTest * _Nullable)abTest __attribute__((swift_name("doCopy(component:action:value:id:abTest:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) OphanMultiplatform_ophanAbTest * _Nullable abTest __attribute__((swift_name("abTest")));
@property (readonly) OphanMultiplatform_ophanAction *action __attribute__((swift_name("action")));
@property (readonly) OphanMultiplatform_ophanComponentV2 *component __attribute__((swift_name("component")));
@property (readonly) NSString * _Nullable id __attribute__((swift_name("id")));
@property (readonly) NSString * _Nullable value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanAcquisition")))
@interface OphanMultiplatform_ophanAcquisition : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithProduct:(OphanMultiplatform_ophanProduct *)product paymentFrequency:(OphanMultiplatform_ophanPaymentFrequency *)paymentFrequency currency:(NSString *)currency amount:(double)amount paymentProvider:(OphanMultiplatform_ophanPaymentProvider * _Nullable)paymentProvider campaignCode:(NSSet<NSString *> * _Nullable)campaignCode abTests:(OphanMultiplatform_ophanAbTestInfo * _Nullable)abTests countryCode:(NSString * _Nullable)countryCode referrerPageViewId:(NSString * _Nullable)referrerPageViewId referrerUrl:(NSString * _Nullable)referrerUrl componentId:(NSString * _Nullable)componentId componentTypeV2:(OphanMultiplatform_ophanComponentType * _Nullable)componentTypeV2 source:(OphanMultiplatform_ophanAcquisitionSource * _Nullable)source printOptions:(OphanMultiplatform_ophanPrintOptions * _Nullable)printOptions platform:(OphanMultiplatform_ophanPlatform * _Nullable)platform discountLengthInMonths:(OphanShort * _Nullable)discountLengthInMonths discountPercentage:(OphanDouble * _Nullable)discountPercentage promoCode:(NSString * _Nullable)promoCode labels:(NSSet<NSString *> * _Nullable)labels identityId:(NSString * _Nullable)identityId queryParameters:(NSSet<OphanMultiplatform_ophanQueryParameter *> * _Nullable)queryParameters __attribute__((swift_name("init(product:paymentFrequency:currency:amount:paymentProvider:campaignCode:abTests:countryCode:referrerPageViewId:referrerUrl:componentId:componentTypeV2:source:printOptions:platform:discountLengthInMonths:discountPercentage:promoCode:labels:identityId:queryParameters:)"))) __attribute__((objc_designated_initializer));
- (OphanMultiplatform_ophanProduct *)component1 __attribute__((swift_name("component1()")));
- (NSString * _Nullable)component10 __attribute__((swift_name("component10()")));
- (NSString * _Nullable)component11 __attribute__((swift_name("component11()")));
- (OphanMultiplatform_ophanComponentType * _Nullable)component12 __attribute__((swift_name("component12()")));
- (OphanMultiplatform_ophanAcquisitionSource * _Nullable)component13 __attribute__((swift_name("component13()")));
- (OphanMultiplatform_ophanPrintOptions * _Nullable)component14 __attribute__((swift_name("component14()")));
- (OphanMultiplatform_ophanPlatform * _Nullable)component15 __attribute__((swift_name("component15()")));
- (OphanShort * _Nullable)component16 __attribute__((swift_name("component16()")));
- (OphanDouble * _Nullable)component17 __attribute__((swift_name("component17()")));
- (NSString * _Nullable)component18 __attribute__((swift_name("component18()")));
- (NSSet<NSString *> * _Nullable)component19 __attribute__((swift_name("component19()")));
- (OphanMultiplatform_ophanPaymentFrequency *)component2 __attribute__((swift_name("component2()")));
- (NSString * _Nullable)component20 __attribute__((swift_name("component20()")));
- (NSSet<OphanMultiplatform_ophanQueryParameter *> * _Nullable)component21 __attribute__((swift_name("component21()")));
- (NSString *)component3 __attribute__((swift_name("component3()")));
- (double)component4 __attribute__((swift_name("component4()")));
- (OphanMultiplatform_ophanPaymentProvider * _Nullable)component5 __attribute__((swift_name("component5()")));
- (NSSet<NSString *> * _Nullable)component6 __attribute__((swift_name("component6()")));
- (OphanMultiplatform_ophanAbTestInfo * _Nullable)component7 __attribute__((swift_name("component7()")));
- (NSString * _Nullable)component8 __attribute__((swift_name("component8()")));
- (NSString * _Nullable)component9 __attribute__((swift_name("component9()")));
- (OphanMultiplatform_ophanAcquisition *)doCopyProduct:(OphanMultiplatform_ophanProduct *)product paymentFrequency:(OphanMultiplatform_ophanPaymentFrequency *)paymentFrequency currency:(NSString *)currency amount:(double)amount paymentProvider:(OphanMultiplatform_ophanPaymentProvider * _Nullable)paymentProvider campaignCode:(NSSet<NSString *> * _Nullable)campaignCode abTests:(OphanMultiplatform_ophanAbTestInfo * _Nullable)abTests countryCode:(NSString * _Nullable)countryCode referrerPageViewId:(NSString * _Nullable)referrerPageViewId referrerUrl:(NSString * _Nullable)referrerUrl componentId:(NSString * _Nullable)componentId componentTypeV2:(OphanMultiplatform_ophanComponentType * _Nullable)componentTypeV2 source:(OphanMultiplatform_ophanAcquisitionSource * _Nullable)source printOptions:(OphanMultiplatform_ophanPrintOptions * _Nullable)printOptions platform:(OphanMultiplatform_ophanPlatform * _Nullable)platform discountLengthInMonths:(OphanShort * _Nullable)discountLengthInMonths discountPercentage:(OphanDouble * _Nullable)discountPercentage promoCode:(NSString * _Nullable)promoCode labels:(NSSet<NSString *> * _Nullable)labels identityId:(NSString * _Nullable)identityId queryParameters:(NSSet<OphanMultiplatform_ophanQueryParameter *> * _Nullable)queryParameters __attribute__((swift_name("doCopy(product:paymentFrequency:currency:amount:paymentProvider:campaignCode:abTests:countryCode:referrerPageViewId:referrerUrl:componentId:componentTypeV2:source:printOptions:platform:discountLengthInMonths:discountPercentage:promoCode:labels:identityId:queryParameters:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) OphanMultiplatform_ophanAbTestInfo * _Nullable abTests __attribute__((swift_name("abTests")));
@property (readonly) double amount __attribute__((swift_name("amount")));
@property (readonly) NSSet<NSString *> * _Nullable campaignCode __attribute__((swift_name("campaignCode")));
@property (readonly) NSString * _Nullable componentId __attribute__((swift_name("componentId")));
@property (readonly) OphanMultiplatform_ophanComponentType * _Nullable componentTypeV2 __attribute__((swift_name("componentTypeV2")));
@property (readonly) NSString * _Nullable countryCode __attribute__((swift_name("countryCode")));
@property (readonly) NSString *currency __attribute__((swift_name("currency")));
@property (readonly) OphanShort * _Nullable discountLengthInMonths __attribute__((swift_name("discountLengthInMonths")));
@property (readonly) OphanDouble * _Nullable discountPercentage __attribute__((swift_name("discountPercentage")));
@property (readonly) NSString * _Nullable identityId __attribute__((swift_name("identityId")));
@property (readonly) NSSet<NSString *> * _Nullable labels __attribute__((swift_name("labels")));
@property (readonly) OphanMultiplatform_ophanPaymentFrequency *paymentFrequency __attribute__((swift_name("paymentFrequency")));
@property (readonly) OphanMultiplatform_ophanPaymentProvider * _Nullable paymentProvider __attribute__((swift_name("paymentProvider")));
@property (readonly) OphanMultiplatform_ophanPlatform * _Nullable platform __attribute__((swift_name("platform")));
@property (readonly) OphanMultiplatform_ophanPrintOptions * _Nullable printOptions __attribute__((swift_name("printOptions")));
@property (readonly) OphanMultiplatform_ophanProduct *product __attribute__((swift_name("product")));
@property (readonly) NSString * _Nullable promoCode __attribute__((swift_name("promoCode")));
@property (readonly) NSSet<OphanMultiplatform_ophanQueryParameter *> * _Nullable queryParameters __attribute__((swift_name("queryParameters")));
@property (readonly) NSString * _Nullable referrerPageViewId __attribute__((swift_name("referrerPageViewId")));
@property (readonly) NSString * _Nullable referrerUrl __attribute__((swift_name("referrerUrl")));
@property (readonly) OphanMultiplatform_ophanAcquisitionSource * _Nullable source __attribute__((swift_name("source")));
@end;

__attribute__((swift_name("KotlinIterator")))
@protocol OphanKotlinIterator
@required
- (BOOL)hasNext __attribute__((swift_name("hasNext()")));
- (id _Nullable)next __attribute__((swift_name("next()")));
@end;

__attribute__((swift_name("Multiplatform_ophanTransport")))
@interface OphanMultiplatform_ophanTransport : KotlinBase
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (void)close __attribute__((swift_name("close()")));
- (void)flush __attribute__((swift_name("flush()")));
- (int32_t)readBuffer:(OphanKotlinByteArray *)buffer offset:(int32_t)offset count:(int32_t)count __attribute__((swift_name("read(buffer:offset:count:)")));
- (void)writeData:(OphanKotlinByteArray *)data __attribute__((swift_name("write(data:)")));
- (void)writeBuffer:(OphanKotlinByteArray *)buffer offset:(int32_t)offset count:(int32_t)count __attribute__((swift_name("write(buffer:offset:count:)")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanFieldMetadata")))
@interface OphanMultiplatform_ophanFieldMetadata : KotlinBase
- (instancetype)initWithName:(NSString *)name typeId:(int8_t)typeId fieldId:(int16_t)fieldId __attribute__((swift_name("init(name:typeId:fieldId:)"))) __attribute__((objc_designated_initializer));
@property (readonly) int16_t fieldId __attribute__((swift_name("fieldId")));
@property (readonly) NSString *name __attribute__((swift_name("name")));
@property (readonly) int8_t typeId __attribute__((swift_name("typeId")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanListMetadata")))
@interface OphanMultiplatform_ophanListMetadata : KotlinBase
- (instancetype)initWithElementTypeId:(int8_t)elementTypeId size:(int32_t)size __attribute__((swift_name("init(elementTypeId:size:)"))) __attribute__((objc_designated_initializer));
@property (readonly) int8_t elementTypeId __attribute__((swift_name("elementTypeId")));
@property (readonly) int32_t size __attribute__((swift_name("size")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanMapMetadata")))
@interface OphanMultiplatform_ophanMapMetadata : KotlinBase
- (instancetype)initWithKeyTypeId:(int8_t)keyTypeId valueTypeId:(int8_t)valueTypeId size:(int32_t)size __attribute__((swift_name("init(keyTypeId:valueTypeId:size:)"))) __attribute__((objc_designated_initializer));
@property (readonly) int8_t keyTypeId __attribute__((swift_name("keyTypeId")));
@property (readonly) int32_t size __attribute__((swift_name("size")));
@property (readonly) int8_t valueTypeId __attribute__((swift_name("valueTypeId")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanMessageMetadata")))
@interface OphanMultiplatform_ophanMessageMetadata : KotlinBase
- (instancetype)initWithName:(NSString * _Nullable)name type:(int8_t)type seqId:(int32_t)seqId __attribute__((swift_name("init(name:type:seqId:)"))) __attribute__((objc_designated_initializer));
@property (readonly) NSString *name __attribute__((swift_name("name")));
@property (readonly) int32_t seqId __attribute__((swift_name("seqId")));
@property (readonly) int8_t type __attribute__((swift_name("type")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanSetMetadata")))
@interface OphanMultiplatform_ophanSetMetadata : KotlinBase
- (instancetype)initWithElementTypeId:(int8_t)elementTypeId size:(int32_t)size __attribute__((swift_name("init(elementTypeId:size:)"))) __attribute__((objc_designated_initializer));
@property (readonly) int8_t elementTypeId __attribute__((swift_name("elementTypeId")));
@property (readonly) int32_t size __attribute__((swift_name("size")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanStructMetadata")))
@interface OphanMultiplatform_ophanStructMetadata : KotlinBase
- (instancetype)initWithName:(NSString *)name __attribute__((swift_name("init(name:)"))) __attribute__((objc_designated_initializer));
@property (readonly) NSString *name __attribute__((swift_name("name")));
@end;

__attribute__((swift_name("KotlinByteIterator")))
@interface OphanKotlinByteIterator : KotlinBase <OphanKotlinIterator>
- (instancetype)init __attribute__((swift_name("init()"))) __attribute__((objc_designated_initializer));
+ (instancetype)new __attribute__((availability(swift, unavailable, message="use object initializers instead")));
- (OphanByte *)next __attribute__((swift_name("next()")));
- (int8_t)nextByte __attribute__((swift_name("nextByte()")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanBenchmarkType")))
@interface OphanMultiplatform_ophanBenchmarkType : OphanKotlinEnum
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
@property (class, readonly) OphanMultiplatform_ophanBenchmarkType *taptoarticledisplay __attribute__((swift_name("taptoarticledisplay")));
@property (class, readonly) OphanMultiplatform_ophanBenchmarkType *launchtime __attribute__((swift_name("launchtime")));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (int32_t)compareToOther:(OphanMultiplatform_ophanBenchmarkType *)other __attribute__((swift_name("compareTo(other:)")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanRequestType")))
@interface OphanMultiplatform_ophanRequestType : OphanKotlinEnum
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
@property (class, readonly) OphanMultiplatform_ophanRequestType *homefrontandgroups __attribute__((swift_name("homefrontandgroups")));
@property (class, readonly) OphanMultiplatform_ophanRequestType *frontandgroups __attribute__((swift_name("frontandgroups")));
@property (class, readonly) OphanMultiplatform_ophanRequestType *group __attribute__((swift_name("group")));
@property (class, readonly) OphanMultiplatform_ophanRequestType *list __attribute__((swift_name("list")));
@property (class, readonly) OphanMultiplatform_ophanRequestType *item __attribute__((swift_name("item")));
@property (class, readonly) OphanMultiplatform_ophanRequestType *search __attribute__((swift_name("search")));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (int32_t)compareToOther:(OphanMultiplatform_ophanRequestType *)other __attribute__((swift_name("compareTo(other:)")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanConnectionType")))
@interface OphanMultiplatform_ophanConnectionType : OphanKotlinEnum
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
@property (class, readonly) OphanMultiplatform_ophanConnectionType *wifi __attribute__((swift_name("wifi")));
@property (class, readonly) OphanMultiplatform_ophanConnectionType *wwan __attribute__((swift_name("wwan")));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (int32_t)compareToOther:(OphanMultiplatform_ophanConnectionType *)other __attribute__((swift_name("compareTo(other:)")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanMediaType")))
@interface OphanMultiplatform_ophanMediaType : OphanKotlinEnum
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
@property (class, readonly) OphanMultiplatform_ophanMediaType *video __attribute__((swift_name("video")));
@property (class, readonly) OphanMultiplatform_ophanMediaType *audio __attribute__((swift_name("audio")));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (int32_t)compareToOther:(OphanMultiplatform_ophanMediaType *)other __attribute__((swift_name("compareTo(other:)")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanMediaEvent")))
@interface OphanMultiplatform_ophanMediaEvent : OphanKotlinEnum
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
@property (class, readonly) OphanMultiplatform_ophanMediaEvent *request __attribute__((swift_name("request")));
@property (class, readonly) OphanMultiplatform_ophanMediaEvent *ready __attribute__((swift_name("ready")));
@property (class, readonly) OphanMultiplatform_ophanMediaEvent *play __attribute__((swift_name("play")));
@property (class, readonly) OphanMultiplatform_ophanMediaEvent *percent25 __attribute__((swift_name("percent25")));
@property (class, readonly) OphanMultiplatform_ophanMediaEvent *percent50 __attribute__((swift_name("percent50")));
@property (class, readonly) OphanMultiplatform_ophanMediaEvent *percent75 __attribute__((swift_name("percent75")));
@property (class, readonly) OphanMultiplatform_ophanMediaEvent *theEnd __attribute__((swift_name("theEnd")));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (int32_t)compareToOther:(OphanMultiplatform_ophanMediaEvent *)other __attribute__((swift_name("compareTo(other:)")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanAbTest")))
@interface OphanMultiplatform_ophanAbTest : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithName:(NSString *)name variant:(NSString *)variant complete:(OphanBoolean * _Nullable)complete campaignCodes:(NSSet<NSString *> * _Nullable)campaignCodes __attribute__((swift_name("init(name:variant:complete:campaignCodes:)"))) __attribute__((objc_designated_initializer));
- (NSString *)component1 __attribute__((swift_name("component1()")));
- (NSString *)component2 __attribute__((swift_name("component2()")));
- (OphanBoolean * _Nullable)component3 __attribute__((swift_name("component3()")));
- (NSSet<NSString *> * _Nullable)component4 __attribute__((swift_name("component4()")));
- (OphanMultiplatform_ophanAbTest *)doCopyName:(NSString *)name variant:(NSString *)variant complete:(OphanBoolean * _Nullable)complete campaignCodes:(NSSet<NSString *> * _Nullable)campaignCodes __attribute__((swift_name("doCopy(name:variant:complete:campaignCodes:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) NSSet<NSString *> * _Nullable campaignCodes __attribute__((swift_name("campaignCodes")));
@property (readonly) OphanBoolean * _Nullable complete __attribute__((swift_name("complete")));
@property (readonly) NSString *name __attribute__((swift_name("name")));
@property (readonly) NSString *variant __attribute__((swift_name("variant")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanLinkName")))
@interface OphanMultiplatform_ophanLinkName : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithRaw:(NSArray<NSString *> * _Nullable)raw __attribute__((swift_name("init(raw:)"))) __attribute__((objc_designated_initializer));
- (NSArray<NSString *> * _Nullable)component1 __attribute__((swift_name("component1()")));
- (OphanMultiplatform_ophanLinkName *)doCopyRaw:(NSArray<NSString *> * _Nullable)raw __attribute__((swift_name("doCopy(raw:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) NSArray<NSString *> * _Nullable raw __attribute__((swift_name("raw")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanGoogleReferral")))
@interface OphanMultiplatform_ophanGoogleReferral : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithQ:(NSString * _Nullable)q rank:(OphanInt * _Nullable)rank source:(NSString * _Nullable)source __attribute__((swift_name("init(q:rank:source:)"))) __attribute__((objc_designated_initializer));
- (NSString * _Nullable)component1 __attribute__((swift_name("component1()")));
- (OphanInt * _Nullable)component2 __attribute__((swift_name("component2()")));
- (NSString * _Nullable)component3 __attribute__((swift_name("component3()")));
- (OphanMultiplatform_ophanGoogleReferral *)doCopyQ:(NSString * _Nullable)q rank:(OphanInt * _Nullable)rank source:(NSString * _Nullable)source __attribute__((swift_name("doCopy(q:rank:source:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) NSString * _Nullable q __attribute__((swift_name("q")));
@property (readonly) OphanInt * _Nullable rank __attribute__((swift_name("rank")));
@property (readonly) NSString * _Nullable source __attribute__((swift_name("source")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanSignificantSite")))
@interface OphanMultiplatform_ophanSignificantSite : OphanKotlinEnum
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *guardian __attribute__((swift_name("guardian")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *guardianEmail __attribute__((swift_name("guardianEmail")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *guardianPush __attribute__((swift_name("guardianPush")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *google __attribute__((swift_name("google")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *twitter __attribute__((swift_name("twitter")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *facebook __attribute__((swift_name("facebook")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *reddit __attribute__((swift_name("reddit")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *drudgeReport __attribute__((swift_name("drudgeReport")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *outbrain __attribute__((swift_name("outbrain")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *tumblr __attribute__((swift_name("tumblr")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *pinterest __attribute__((swift_name("pinterest")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *digg __attribute__((swift_name("digg")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *stumbleupon __attribute__((swift_name("stumbleupon")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *flipboard __attribute__((swift_name("flipboard")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *linkedin __attribute__((swift_name("linkedin")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *bing __attribute__((swift_name("bing")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *spotlight __attribute__((swift_name("spotlight")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *weChat __attribute__((swift_name("weChat")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *whatsApp __attribute__((swift_name("whatsApp")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *appleNews __attribute__((swift_name("appleNews")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *inShorts __attribute__((swift_name("inShorts")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *upday __attribute__((swift_name("upday")));
@property (class, readonly) OphanMultiplatform_ophanSignificantSite *smartNews __attribute__((swift_name("smartNews")));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (int32_t)compareToOther:(OphanMultiplatform_ophanSignificantSite *)other __attribute__((swift_name("compareTo(other:)")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanComponentV2")))
@interface OphanMultiplatform_ophanComponentV2 : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithComponentType:(OphanMultiplatform_ophanComponentType *)componentType id:(NSString * _Nullable)id products:(NSSet<OphanMultiplatform_ophanProduct *> *)products campaignCode:(NSString * _Nullable)campaignCode labels:(NSSet<NSString *> *)labels __attribute__((swift_name("init(componentType:id:products:campaignCode:labels:)"))) __attribute__((objc_designated_initializer));
- (OphanMultiplatform_ophanComponentType *)component1 __attribute__((swift_name("component1()")));
- (NSString * _Nullable)component2 __attribute__((swift_name("component2()")));
- (NSSet<OphanMultiplatform_ophanProduct *> *)component3 __attribute__((swift_name("component3()")));
- (NSString * _Nullable)component4 __attribute__((swift_name("component4()")));
- (NSSet<NSString *> *)component5 __attribute__((swift_name("component5()")));
- (OphanMultiplatform_ophanComponentV2 *)doCopyComponentType:(OphanMultiplatform_ophanComponentType *)componentType id:(NSString * _Nullable)id products:(NSSet<OphanMultiplatform_ophanProduct *> *)products campaignCode:(NSString * _Nullable)campaignCode labels:(NSSet<NSString *> *)labels __attribute__((swift_name("doCopy(componentType:id:products:campaignCode:labels:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) NSString * _Nullable campaignCode __attribute__((swift_name("campaignCode")));
@property (readonly) OphanMultiplatform_ophanComponentType *componentType __attribute__((swift_name("componentType")));
@property (readonly) NSString * _Nullable id __attribute__((swift_name("id")));
@property (readonly) NSSet<NSString *> *labels __attribute__((swift_name("labels")));
@property (readonly) NSSet<OphanMultiplatform_ophanProduct *> *products __attribute__((swift_name("products")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanAction")))
@interface OphanMultiplatform_ophanAction : OphanKotlinEnum
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
@property (class, readonly) OphanMultiplatform_ophanAction *insert __attribute__((swift_name("insert")));
@property (class, readonly) OphanMultiplatform_ophanAction *view __attribute__((swift_name("view")));
@property (class, readonly) OphanMultiplatform_ophanAction *expand __attribute__((swift_name("expand")));
@property (class, readonly) OphanMultiplatform_ophanAction *like __attribute__((swift_name("like")));
@property (class, readonly) OphanMultiplatform_ophanAction *dislike __attribute__((swift_name("dislike")));
@property (class, readonly) OphanMultiplatform_ophanAction *subscribe __attribute__((swift_name("subscribe")));
@property (class, readonly) OphanMultiplatform_ophanAction *answer __attribute__((swift_name("answer")));
@property (class, readonly) OphanMultiplatform_ophanAction *vote __attribute__((swift_name("vote")));
@property (class, readonly) OphanMultiplatform_ophanAction *click __attribute__((swift_name("click")));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (int32_t)compareToOther:(OphanMultiplatform_ophanAction *)other __attribute__((swift_name("compareTo(other:)")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanProduct")))
@interface OphanMultiplatform_ophanProduct : OphanKotlinEnum
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
@property (class, readonly) OphanMultiplatform_ophanProduct *contribution __attribute__((swift_name("contribution")));
@property (class, readonly) OphanMultiplatform_ophanProduct *recurringContribution __attribute__((swift_name("recurringContribution")));
@property (class, readonly) OphanMultiplatform_ophanProduct *membershipSupporter __attribute__((swift_name("membershipSupporter")));
@property (class, readonly) OphanMultiplatform_ophanProduct *membershipPatron __attribute__((swift_name("membershipPatron")));
@property (class, readonly) OphanMultiplatform_ophanProduct *membershipPartner __attribute__((swift_name("membershipPartner")));
@property (class, readonly) OphanMultiplatform_ophanProduct *digitalSubscription __attribute__((swift_name("digitalSubscription")));
@property (class, readonly) OphanMultiplatform_ophanProduct *paperSubscriptionEveryday __attribute__((swift_name("paperSubscriptionEveryday")));
@property (class, readonly) OphanMultiplatform_ophanProduct *paperSubscriptionSixday __attribute__((swift_name("paperSubscriptionSixday")));
@property (class, readonly) OphanMultiplatform_ophanProduct *paperSubscriptionWeekend __attribute__((swift_name("paperSubscriptionWeekend")));
@property (class, readonly) OphanMultiplatform_ophanProduct *paperSubscriptionSunday __attribute__((swift_name("paperSubscriptionSunday")));
@property (class, readonly) OphanMultiplatform_ophanProduct *printSubscription __attribute__((swift_name("printSubscription")));
@property (class, readonly) OphanMultiplatform_ophanProduct *appPremiumTier __attribute__((swift_name("appPremiumTier")));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (int32_t)compareToOther:(OphanMultiplatform_ophanProduct *)other __attribute__((swift_name("compareTo(other:)")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanPaymentFrequency")))
@interface OphanMultiplatform_ophanPaymentFrequency : OphanKotlinEnum
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
@property (class, readonly) OphanMultiplatform_ophanPaymentFrequency *oneOff __attribute__((swift_name("oneOff")));
@property (class, readonly) OphanMultiplatform_ophanPaymentFrequency *monthly __attribute__((swift_name("monthly")));
@property (class, readonly) OphanMultiplatform_ophanPaymentFrequency *annually __attribute__((swift_name("annually")));
@property (class, readonly) OphanMultiplatform_ophanPaymentFrequency *quarterly __attribute__((swift_name("quarterly")));
@property (class, readonly) OphanMultiplatform_ophanPaymentFrequency *sixMonthly __attribute__((swift_name("sixMonthly")));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (int32_t)compareToOther:(OphanMultiplatform_ophanPaymentFrequency *)other __attribute__((swift_name("compareTo(other:)")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanPaymentProvider")))
@interface OphanMultiplatform_ophanPaymentProvider : OphanKotlinEnum
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
@property (class, readonly) OphanMultiplatform_ophanPaymentProvider *stripe __attribute__((swift_name("stripe")));
@property (class, readonly) OphanMultiplatform_ophanPaymentProvider *paypal __attribute__((swift_name("paypal")));
@property (class, readonly) OphanMultiplatform_ophanPaymentProvider *gocardless __attribute__((swift_name("gocardless")));
@property (class, readonly) OphanMultiplatform_ophanPaymentProvider *inAppPurchase __attribute__((swift_name("inAppPurchase")));
@property (class, readonly) OphanMultiplatform_ophanPaymentProvider *stripeApplePay __attribute__((swift_name("stripeApplePay")));
@property (class, readonly) OphanMultiplatform_ophanPaymentProvider *stripePaymentRequestButton __attribute__((swift_name("stripePaymentRequestButton")));
@property (class, readonly) OphanMultiplatform_ophanPaymentProvider *subscribeWithGoogle __attribute__((swift_name("subscribeWithGoogle")));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (int32_t)compareToOther:(OphanMultiplatform_ophanPaymentProvider *)other __attribute__((swift_name("compareTo(other:)")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanComponentType")))
@interface OphanMultiplatform_ophanComponentType : OphanKotlinEnum
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
@property (class, readonly) OphanMultiplatform_ophanComponentType *readersQuestionsAtom __attribute__((swift_name("readersQuestionsAtom")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *qandaAtom __attribute__((swift_name("qandaAtom")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *profileAtom __attribute__((swift_name("profileAtom")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *guideAtom __attribute__((swift_name("guideAtom")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *timelineAtom __attribute__((swift_name("timelineAtom")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *newsletterSubscription __attribute__((swift_name("newsletterSubscription")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *surveysQuestions __attribute__((swift_name("surveysQuestions")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *acquisitionsEpic __attribute__((swift_name("acquisitionsEpic")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *acquisitionsEngagementBanner __attribute__((swift_name("acquisitionsEngagementBanner")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *acquisitionsThankYouEpic __attribute__((swift_name("acquisitionsThankYouEpic")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *acquisitionsHeader __attribute__((swift_name("acquisitionsHeader")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *acquisitionsFooter __attribute__((swift_name("acquisitionsFooter")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *acquisitionsInteractiveSlice __attribute__((swift_name("acquisitionsInteractiveSlice")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *acquisitionsNugget __attribute__((swift_name("acquisitionsNugget")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *acquisitionsStandfirst __attribute__((swift_name("acquisitionsStandfirst")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *acquisitionsThrasher __attribute__((swift_name("acquisitionsThrasher")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *acquisitionsEditorialLink __attribute__((swift_name("acquisitionsEditorialLink")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *acquisitionsManageMyAccount __attribute__((swift_name("acquisitionsManageMyAccount")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *acquisitionsButton __attribute__((swift_name("acquisitionsButton")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *acquisitionsOther __attribute__((swift_name("acquisitionsOther")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *appAdvert __attribute__((swift_name("appAdvert")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *appAudio __attribute__((swift_name("appAudio")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *appButton __attribute__((swift_name("appButton")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *appCard __attribute__((swift_name("appCard")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *appCrosswords __attribute__((swift_name("appCrosswords")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *appEngagementBanner __attribute__((swift_name("appEngagementBanner")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *appEpic __attribute__((swift_name("appEpic")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *appGallery __attribute__((swift_name("appGallery")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *appLink __attribute__((swift_name("appLink")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *appNavigationItem __attribute__((swift_name("appNavigationItem")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *appScreen __attribute__((swift_name("appScreen")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *appThrasher __attribute__((swift_name("appThrasher")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *appVideo __attribute__((swift_name("appVideo")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *audioAtom __attribute__((swift_name("audioAtom")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *chartAtom __attribute__((swift_name("chartAtom")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *acquisitionsMerchandising __attribute__((swift_name("acquisitionsMerchandising")));
@property (class, readonly) OphanMultiplatform_ophanComponentType *acquisitionsHouseAds __attribute__((swift_name("acquisitionsHouseAds")));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (int32_t)compareToOther:(OphanMultiplatform_ophanComponentType *)other __attribute__((swift_name("compareTo(other:)")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanAcquisitionSource")))
@interface OphanMultiplatform_ophanAcquisitionSource : OphanKotlinEnum
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
@property (class, readonly) OphanMultiplatform_ophanAcquisitionSource *guardianWeb __attribute__((swift_name("guardianWeb")));
@property (class, readonly) OphanMultiplatform_ophanAcquisitionSource *guardianApps __attribute__((swift_name("guardianApps")));
@property (class, readonly) OphanMultiplatform_ophanAcquisitionSource *email __attribute__((swift_name("email")));
@property (class, readonly) OphanMultiplatform_ophanAcquisitionSource *social __attribute__((swift_name("social")));
@property (class, readonly) OphanMultiplatform_ophanAcquisitionSource *search __attribute__((swift_name("search")));
@property (class, readonly) OphanMultiplatform_ophanAcquisitionSource *ppc __attribute__((swift_name("ppc")));
@property (class, readonly) OphanMultiplatform_ophanAcquisitionSource *direct __attribute__((swift_name("direct")));
@property (class, readonly) OphanMultiplatform_ophanAcquisitionSource *guardianAppIos __attribute__((swift_name("guardianAppIos")));
@property (class, readonly) OphanMultiplatform_ophanAcquisitionSource *guardianAppAndroid __attribute__((swift_name("guardianAppAndroid")));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (int32_t)compareToOther:(OphanMultiplatform_ophanAcquisitionSource *)other __attribute__((swift_name("compareTo(other:)")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanPrintOptions")))
@interface OphanMultiplatform_ophanPrintOptions : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithProduct:(OphanMultiplatform_ophanPrintProduct *)product deliveryCountryCode:(NSString *)deliveryCountryCode __attribute__((swift_name("init(product:deliveryCountryCode:)"))) __attribute__((objc_designated_initializer));
- (OphanMultiplatform_ophanPrintProduct *)component1 __attribute__((swift_name("component1()")));
- (NSString *)component2 __attribute__((swift_name("component2()")));
- (OphanMultiplatform_ophanPrintOptions *)doCopyProduct:(OphanMultiplatform_ophanPrintProduct *)product deliveryCountryCode:(NSString *)deliveryCountryCode __attribute__((swift_name("doCopy(product:deliveryCountryCode:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) NSString *deliveryCountryCode __attribute__((swift_name("deliveryCountryCode")));
@property (readonly) OphanMultiplatform_ophanPrintProduct *product __attribute__((swift_name("product")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanQueryParameter")))
@interface OphanMultiplatform_ophanQueryParameter : KotlinBase <OphanMultiplatform_ophanStruct>
- (instancetype)initWithName:(NSString *)name value:(NSString *)value __attribute__((swift_name("init(name:value:)"))) __attribute__((objc_designated_initializer));
- (NSString *)component1 __attribute__((swift_name("component1()")));
- (NSString *)component2 __attribute__((swift_name("component2()")));
- (OphanMultiplatform_ophanQueryParameter *)doCopyName:(NSString *)name value:(NSString *)value __attribute__((swift_name("doCopy(name:value:)")));
- (BOOL)isEqual:(id _Nullable)other __attribute__((swift_name("isEqual(_:)")));
- (NSUInteger)hash __attribute__((swift_name("hash()")));
- (NSString *)description __attribute__((swift_name("description()")));
- (void)writeProtocol:(OphanMultiplatform_ophanProtocol *)protocol __attribute__((swift_name("write(protocol:)")));
@property (readonly) NSString *name __attribute__((swift_name("name")));
@property (readonly) NSString *value __attribute__((swift_name("value")));
@end;

__attribute__((objc_subclassing_restricted))
__attribute__((swift_name("Multiplatform_ophanPrintProduct")))
@interface OphanMultiplatform_ophanPrintProduct : OphanKotlinEnum
+ (instancetype)alloc __attribute__((unavailable));
+ (instancetype)allocWithZone:(struct _NSZone *)zone __attribute__((unavailable));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *voucherSaturday __attribute__((swift_name("voucherSaturday")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *voucherSaturdayPlus __attribute__((swift_name("voucherSaturdayPlus")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *voucherWeeklyAndSaturday __attribute__((swift_name("voucherWeeklyAndSaturday")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *voucherWeeklyAndSaturdayPlus __attribute__((swift_name("voucherWeeklyAndSaturdayPlus")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *voucherSunday __attribute__((swift_name("voucherSunday")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *voucherSundayPlus __attribute__((swift_name("voucherSundayPlus")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *voucerWeekend __attribute__((swift_name("voucerWeekend")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *voucerWeekendPlus __attribute__((swift_name("voucerWeekendPlus")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *voucherSixday __attribute__((swift_name("voucherSixday")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *voucherSixdayPlus __attribute__((swift_name("voucherSixdayPlus")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *voucherEveryday __attribute__((swift_name("voucherEveryday")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *voucherEverydayPlus __attribute__((swift_name("voucherEverydayPlus")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *homeDeliverySaturday __attribute__((swift_name("homeDeliverySaturday")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *homeDeliverySaturdayPlus __attribute__((swift_name("homeDeliverySaturdayPlus")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *homeDeliveryWeeklyAndSaturday __attribute__((swift_name("homeDeliveryWeeklyAndSaturday")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *homeDeliveryWeeklyAndSaturdayPlus __attribute__((swift_name("homeDeliveryWeeklyAndSaturdayPlus")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *homeDeliverySunday __attribute__((swift_name("homeDeliverySunday")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *homeDeliverySundayPlus __attribute__((swift_name("homeDeliverySundayPlus")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *homeDeliveryWeekend __attribute__((swift_name("homeDeliveryWeekend")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *homeDeliveryWeekendPlus __attribute__((swift_name("homeDeliveryWeekendPlus")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *homeDeliverySixday __attribute__((swift_name("homeDeliverySixday")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *homeDeliverySixdayPlus __attribute__((swift_name("homeDeliverySixdayPlus")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *homeDeliveryEveryday __attribute__((swift_name("homeDeliveryEveryday")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *homeDeliveryEverydayPlus __attribute__((swift_name("homeDeliveryEverydayPlus")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *guardianWeekly __attribute__((swift_name("guardianWeekly")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *guardianWeeklyPlus __attribute__((swift_name("guardianWeeklyPlus")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *voucherWeekend __attribute__((swift_name("voucherWeekend")));
@property (class, readonly) OphanMultiplatform_ophanPrintProduct *voucherWeekendPlus __attribute__((swift_name("voucherWeekendPlus")));
- (instancetype)initWithName:(NSString *)name ordinal:(int32_t)ordinal __attribute__((swift_name("init(name:ordinal:)"))) __attribute__((objc_designated_initializer)) __attribute__((unavailable));
- (int32_t)compareToOther:(OphanMultiplatform_ophanPrintProduct *)other __attribute__((swift_name("compareTo(other:)")));
@property (readonly) int32_t value __attribute__((swift_name("value")));
@end;

#pragma clang diagnostic pop
NS_ASSUME_NONNULL_END
