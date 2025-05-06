
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Recipe
 * 
 */
export type Recipe = $Result.DefaultSelection<Prisma.$RecipePayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model RecipeTag
 * 
 */
export type RecipeTag = $Result.DefaultSelection<Prisma.$RecipeTagPayload>
/**
 * Model Vote
 * 
 */
export type Vote = $Result.DefaultSelection<Prisma.$VotePayload>
/**
 * Model Bookmark
 * 
 */
export type Bookmark = $Result.DefaultSelection<Prisma.$BookmarkPayload>
/**
 * Model Tried
 * 
 */
export type Tried = $Result.DefaultSelection<Prisma.$TriedPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recipe`: Exposes CRUD operations for the **Recipe** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recipes
    * const recipes = await prisma.recipe.findMany()
    * ```
    */
  get recipe(): Prisma.RecipeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recipeTag`: Exposes CRUD operations for the **RecipeTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecipeTags
    * const recipeTags = await prisma.recipeTag.findMany()
    * ```
    */
  get recipeTag(): Prisma.RecipeTagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vote`: Exposes CRUD operations for the **Vote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Votes
    * const votes = await prisma.vote.findMany()
    * ```
    */
  get vote(): Prisma.VoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookmark`: Exposes CRUD operations for the **Bookmark** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookmarks
    * const bookmarks = await prisma.bookmark.findMany()
    * ```
    */
  get bookmark(): Prisma.BookmarkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tried`: Exposes CRUD operations for the **Tried** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trieds
    * const trieds = await prisma.tried.findMany()
    * ```
    */
  get tried(): Prisma.TriedDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Recipe: 'Recipe',
    Tag: 'Tag',
    RecipeTag: 'RecipeTag',
    Vote: 'Vote',
    Bookmark: 'Bookmark',
    Tried: 'Tried'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "recipe" | "tag" | "recipeTag" | "vote" | "bookmark" | "tried"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Recipe: {
        payload: Prisma.$RecipePayload<ExtArgs>
        fields: Prisma.RecipeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecipeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecipeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          findFirst: {
            args: Prisma.RecipeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecipeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          findMany: {
            args: Prisma.RecipeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>[]
          }
          create: {
            args: Prisma.RecipeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          createMany: {
            args: Prisma.RecipeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RecipeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          update: {
            args: Prisma.RecipeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          deleteMany: {
            args: Prisma.RecipeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecipeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RecipeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          aggregate: {
            args: Prisma.RecipeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecipe>
          }
          groupBy: {
            args: Prisma.RecipeGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecipeGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecipeCountArgs<ExtArgs>
            result: $Utils.Optional<RecipeCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      RecipeTag: {
        payload: Prisma.$RecipeTagPayload<ExtArgs>
        fields: Prisma.RecipeTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecipeTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecipeTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeTagPayload>
          }
          findFirst: {
            args: Prisma.RecipeTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecipeTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeTagPayload>
          }
          findMany: {
            args: Prisma.RecipeTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeTagPayload>[]
          }
          create: {
            args: Prisma.RecipeTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeTagPayload>
          }
          createMany: {
            args: Prisma.RecipeTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RecipeTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeTagPayload>
          }
          update: {
            args: Prisma.RecipeTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeTagPayload>
          }
          deleteMany: {
            args: Prisma.RecipeTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecipeTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RecipeTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeTagPayload>
          }
          aggregate: {
            args: Prisma.RecipeTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecipeTag>
          }
          groupBy: {
            args: Prisma.RecipeTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecipeTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecipeTagCountArgs<ExtArgs>
            result: $Utils.Optional<RecipeTagCountAggregateOutputType> | number
          }
        }
      }
      Vote: {
        payload: Prisma.$VotePayload<ExtArgs>
        fields: Prisma.VoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          findFirst: {
            args: Prisma.VoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          findMany: {
            args: Prisma.VoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>[]
          }
          create: {
            args: Prisma.VoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          createMany: {
            args: Prisma.VoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          update: {
            args: Prisma.VoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          deleteMany: {
            args: Prisma.VoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          aggregate: {
            args: Prisma.VoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVote>
          }
          groupBy: {
            args: Prisma.VoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<VoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.VoteCountArgs<ExtArgs>
            result: $Utils.Optional<VoteCountAggregateOutputType> | number
          }
        }
      }
      Bookmark: {
        payload: Prisma.$BookmarkPayload<ExtArgs>
        fields: Prisma.BookmarkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookmarkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookmarkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          findFirst: {
            args: Prisma.BookmarkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookmarkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          findMany: {
            args: Prisma.BookmarkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>[]
          }
          create: {
            args: Prisma.BookmarkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          createMany: {
            args: Prisma.BookmarkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BookmarkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          update: {
            args: Prisma.BookmarkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          deleteMany: {
            args: Prisma.BookmarkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookmarkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BookmarkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          aggregate: {
            args: Prisma.BookmarkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookmark>
          }
          groupBy: {
            args: Prisma.BookmarkGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookmarkGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookmarkCountArgs<ExtArgs>
            result: $Utils.Optional<BookmarkCountAggregateOutputType> | number
          }
        }
      }
      Tried: {
        payload: Prisma.$TriedPayload<ExtArgs>
        fields: Prisma.TriedFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TriedFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriedPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TriedFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriedPayload>
          }
          findFirst: {
            args: Prisma.TriedFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriedPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TriedFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriedPayload>
          }
          findMany: {
            args: Prisma.TriedFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriedPayload>[]
          }
          create: {
            args: Prisma.TriedCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriedPayload>
          }
          createMany: {
            args: Prisma.TriedCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TriedDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriedPayload>
          }
          update: {
            args: Prisma.TriedUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriedPayload>
          }
          deleteMany: {
            args: Prisma.TriedDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TriedUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TriedUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriedPayload>
          }
          aggregate: {
            args: Prisma.TriedAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTried>
          }
          groupBy: {
            args: Prisma.TriedGroupByArgs<ExtArgs>
            result: $Utils.Optional<TriedGroupByOutputType>[]
          }
          count: {
            args: Prisma.TriedCountArgs<ExtArgs>
            result: $Utils.Optional<TriedCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    recipe?: RecipeOmit
    tag?: TagOmit
    recipeTag?: RecipeTagOmit
    vote?: VoteOmit
    bookmark?: BookmarkOmit
    tried?: TriedOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    recipes: number
    votes: number
    bookmarks: number
    tried: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipes?: boolean | UserCountOutputTypeCountRecipesArgs
    votes?: boolean | UserCountOutputTypeCountVotesArgs
    bookmarks?: boolean | UserCountOutputTypeCountBookmarksArgs
    tried?: boolean | UserCountOutputTypeCountTriedArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRecipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookmarkWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTriedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TriedWhereInput
  }


  /**
   * Count Type RecipeCountOutputType
   */

  export type RecipeCountOutputType = {
    votes: number
    bookmarks: number
    tried: number
    tags: number
  }

  export type RecipeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    votes?: boolean | RecipeCountOutputTypeCountVotesArgs
    bookmarks?: boolean | RecipeCountOutputTypeCountBookmarksArgs
    tried?: boolean | RecipeCountOutputTypeCountTriedArgs
    tags?: boolean | RecipeCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * RecipeCountOutputType without action
   */
  export type RecipeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeCountOutputType
     */
    select?: RecipeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RecipeCountOutputType without action
   */
  export type RecipeCountOutputTypeCountVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
  }

  /**
   * RecipeCountOutputType without action
   */
  export type RecipeCountOutputTypeCountBookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookmarkWhereInput
  }

  /**
   * RecipeCountOutputType without action
   */
  export type RecipeCountOutputTypeCountTriedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TriedWhereInput
  }

  /**
   * RecipeCountOutputType without action
   */
  export type RecipeCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeTagWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    recipes: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipes?: boolean | TagCountOutputTypeCountRecipesArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountRecipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeTagWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recipes?: boolean | User$recipesArgs<ExtArgs>
    votes?: boolean | User$votesArgs<ExtArgs>
    bookmarks?: boolean | User$bookmarksArgs<ExtArgs>
    tried?: boolean | User$triedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipes?: boolean | User$recipesArgs<ExtArgs>
    votes?: boolean | User$votesArgs<ExtArgs>
    bookmarks?: boolean | User$bookmarksArgs<ExtArgs>
    tried?: boolean | User$triedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      recipes: Prisma.$RecipePayload<ExtArgs>[]
      votes: Prisma.$VotePayload<ExtArgs>[]
      bookmarks: Prisma.$BookmarkPayload<ExtArgs>[]
      tried: Prisma.$TriedPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      emailVerified: Date | null
      image: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recipes<T extends User$recipesArgs<ExtArgs> = {}>(args?: Subset<T, User$recipesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    votes<T extends User$votesArgs<ExtArgs> = {}>(args?: Subset<T, User$votesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookmarks<T extends User$bookmarksArgs<ExtArgs> = {}>(args?: Subset<T, User$bookmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tried<T extends User$triedArgs<ExtArgs> = {}>(args?: Subset<T, User$triedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TriedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.recipes
   */
  export type User$recipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    where?: RecipeWhereInput
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    cursor?: RecipeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * User.votes
   */
  export type User$votesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    cursor?: VoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * User.bookmarks
   */
  export type User$bookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    where?: BookmarkWhereInput
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    cursor?: BookmarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * User.tried
   */
  export type User$triedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tried
     */
    select?: TriedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tried
     */
    omit?: TriedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriedInclude<ExtArgs> | null
    where?: TriedWhereInput
    orderBy?: TriedOrderByWithRelationInput | TriedOrderByWithRelationInput[]
    cursor?: TriedWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TriedScalarFieldEnum | TriedScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Recipe
   */

  export type AggregateRecipe = {
    _count: RecipeCountAggregateOutputType | null
    _min: RecipeMinAggregateOutputType | null
    _max: RecipeMaxAggregateOutputType | null
  }

  export type RecipeMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    instructions: string | null
    createdAt: Date | null
    updatedAt: Date | null
    authorId: string | null
  }

  export type RecipeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    instructions: string | null
    createdAt: Date | null
    updatedAt: Date | null
    authorId: string | null
  }

  export type RecipeCountAggregateOutputType = {
    id: number
    name: number
    description: number
    instructions: number
    createdAt: number
    updatedAt: number
    authorId: number
    _all: number
  }


  export type RecipeMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    instructions?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
  }

  export type RecipeMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    instructions?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
  }

  export type RecipeCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    instructions?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
    _all?: true
  }

  export type RecipeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recipe to aggregate.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recipes
    **/
    _count?: true | RecipeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecipeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecipeMaxAggregateInputType
  }

  export type GetRecipeAggregateType<T extends RecipeAggregateArgs> = {
        [P in keyof T & keyof AggregateRecipe]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipe[P]>
      : GetScalarType<T[P], AggregateRecipe[P]>
  }




  export type RecipeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeWhereInput
    orderBy?: RecipeOrderByWithAggregationInput | RecipeOrderByWithAggregationInput[]
    by: RecipeScalarFieldEnum[] | RecipeScalarFieldEnum
    having?: RecipeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecipeCountAggregateInputType | true
    _min?: RecipeMinAggregateInputType
    _max?: RecipeMaxAggregateInputType
  }

  export type RecipeGroupByOutputType = {
    id: string
    name: string
    description: string
    instructions: string
    createdAt: Date
    updatedAt: Date
    authorId: string
    _count: RecipeCountAggregateOutputType | null
    _min: RecipeMinAggregateOutputType | null
    _max: RecipeMaxAggregateOutputType | null
  }

  type GetRecipeGroupByPayload<T extends RecipeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecipeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecipeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecipeGroupByOutputType[P]>
            : GetScalarType<T[P], RecipeGroupByOutputType[P]>
        }
      >
    >


  export type RecipeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    instructions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    votes?: boolean | Recipe$votesArgs<ExtArgs>
    bookmarks?: boolean | Recipe$bookmarksArgs<ExtArgs>
    tried?: boolean | Recipe$triedArgs<ExtArgs>
    tags?: boolean | Recipe$tagsArgs<ExtArgs>
    _count?: boolean | RecipeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipe"]>



  export type RecipeSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    instructions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
  }

  export type RecipeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "instructions" | "createdAt" | "updatedAt" | "authorId", ExtArgs["result"]["recipe"]>
  export type RecipeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    votes?: boolean | Recipe$votesArgs<ExtArgs>
    bookmarks?: boolean | Recipe$bookmarksArgs<ExtArgs>
    tried?: boolean | Recipe$triedArgs<ExtArgs>
    tags?: boolean | Recipe$tagsArgs<ExtArgs>
    _count?: boolean | RecipeCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $RecipePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Recipe"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      votes: Prisma.$VotePayload<ExtArgs>[]
      bookmarks: Prisma.$BookmarkPayload<ExtArgs>[]
      tried: Prisma.$TriedPayload<ExtArgs>[]
      tags: Prisma.$RecipeTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      instructions: string
      createdAt: Date
      updatedAt: Date
      authorId: string
    }, ExtArgs["result"]["recipe"]>
    composites: {}
  }

  type RecipeGetPayload<S extends boolean | null | undefined | RecipeDefaultArgs> = $Result.GetResult<Prisma.$RecipePayload, S>

  type RecipeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecipeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecipeCountAggregateInputType | true
    }

  export interface RecipeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recipe'], meta: { name: 'Recipe' } }
    /**
     * Find zero or one Recipe that matches the filter.
     * @param {RecipeFindUniqueArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecipeFindUniqueArgs>(args: SelectSubset<T, RecipeFindUniqueArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Recipe that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecipeFindUniqueOrThrowArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecipeFindUniqueOrThrowArgs>(args: SelectSubset<T, RecipeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recipe that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFindFirstArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecipeFindFirstArgs>(args?: SelectSubset<T, RecipeFindFirstArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recipe that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFindFirstOrThrowArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecipeFindFirstOrThrowArgs>(args?: SelectSubset<T, RecipeFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recipes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recipes
     * const recipes = await prisma.recipe.findMany()
     * 
     * // Get first 10 Recipes
     * const recipes = await prisma.recipe.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recipeWithIdOnly = await prisma.recipe.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecipeFindManyArgs>(args?: SelectSubset<T, RecipeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Recipe.
     * @param {RecipeCreateArgs} args - Arguments to create a Recipe.
     * @example
     * // Create one Recipe
     * const Recipe = await prisma.recipe.create({
     *   data: {
     *     // ... data to create a Recipe
     *   }
     * })
     * 
     */
    create<T extends RecipeCreateArgs>(args: SelectSubset<T, RecipeCreateArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Recipes.
     * @param {RecipeCreateManyArgs} args - Arguments to create many Recipes.
     * @example
     * // Create many Recipes
     * const recipe = await prisma.recipe.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecipeCreateManyArgs>(args?: SelectSubset<T, RecipeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Recipe.
     * @param {RecipeDeleteArgs} args - Arguments to delete one Recipe.
     * @example
     * // Delete one Recipe
     * const Recipe = await prisma.recipe.delete({
     *   where: {
     *     // ... filter to delete one Recipe
     *   }
     * })
     * 
     */
    delete<T extends RecipeDeleteArgs>(args: SelectSubset<T, RecipeDeleteArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Recipe.
     * @param {RecipeUpdateArgs} args - Arguments to update one Recipe.
     * @example
     * // Update one Recipe
     * const recipe = await prisma.recipe.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecipeUpdateArgs>(args: SelectSubset<T, RecipeUpdateArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Recipes.
     * @param {RecipeDeleteManyArgs} args - Arguments to filter Recipes to delete.
     * @example
     * // Delete a few Recipes
     * const { count } = await prisma.recipe.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecipeDeleteManyArgs>(args?: SelectSubset<T, RecipeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recipes
     * const recipe = await prisma.recipe.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecipeUpdateManyArgs>(args: SelectSubset<T, RecipeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Recipe.
     * @param {RecipeUpsertArgs} args - Arguments to update or create a Recipe.
     * @example
     * // Update or create a Recipe
     * const recipe = await prisma.recipe.upsert({
     *   create: {
     *     // ... data to create a Recipe
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recipe we want to update
     *   }
     * })
     */
    upsert<T extends RecipeUpsertArgs>(args: SelectSubset<T, RecipeUpsertArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeCountArgs} args - Arguments to filter Recipes to count.
     * @example
     * // Count the number of Recipes
     * const count = await prisma.recipe.count({
     *   where: {
     *     // ... the filter for the Recipes we want to count
     *   }
     * })
    **/
    count<T extends RecipeCountArgs>(
      args?: Subset<T, RecipeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecipeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecipeAggregateArgs>(args: Subset<T, RecipeAggregateArgs>): Prisma.PrismaPromise<GetRecipeAggregateType<T>>

    /**
     * Group by Recipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecipeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecipeGroupByArgs['orderBy'] }
        : { orderBy?: RecipeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecipeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recipe model
   */
  readonly fields: RecipeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recipe.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecipeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    votes<T extends Recipe$votesArgs<ExtArgs> = {}>(args?: Subset<T, Recipe$votesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookmarks<T extends Recipe$bookmarksArgs<ExtArgs> = {}>(args?: Subset<T, Recipe$bookmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tried<T extends Recipe$triedArgs<ExtArgs> = {}>(args?: Subset<T, Recipe$triedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TriedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tags<T extends Recipe$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Recipe$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Recipe model
   */
  interface RecipeFieldRefs {
    readonly id: FieldRef<"Recipe", 'String'>
    readonly name: FieldRef<"Recipe", 'String'>
    readonly description: FieldRef<"Recipe", 'String'>
    readonly instructions: FieldRef<"Recipe", 'String'>
    readonly createdAt: FieldRef<"Recipe", 'DateTime'>
    readonly updatedAt: FieldRef<"Recipe", 'DateTime'>
    readonly authorId: FieldRef<"Recipe", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Recipe findUnique
   */
  export type RecipeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe findUniqueOrThrow
   */
  export type RecipeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe findFirst
   */
  export type RecipeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipes.
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipes.
     */
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * Recipe findFirstOrThrow
   */
  export type RecipeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipes.
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipes.
     */
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * Recipe findMany
   */
  export type RecipeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipes to fetch.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recipes.
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * Recipe create
   */
  export type RecipeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * The data needed to create a Recipe.
     */
    data: XOR<RecipeCreateInput, RecipeUncheckedCreateInput>
  }

  /**
   * Recipe createMany
   */
  export type RecipeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recipes.
     */
    data: RecipeCreateManyInput | RecipeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Recipe update
   */
  export type RecipeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * The data needed to update a Recipe.
     */
    data: XOR<RecipeUpdateInput, RecipeUncheckedUpdateInput>
    /**
     * Choose, which Recipe to update.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe updateMany
   */
  export type RecipeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recipes.
     */
    data: XOR<RecipeUpdateManyMutationInput, RecipeUncheckedUpdateManyInput>
    /**
     * Filter which Recipes to update
     */
    where?: RecipeWhereInput
    /**
     * Limit how many Recipes to update.
     */
    limit?: number
  }

  /**
   * Recipe upsert
   */
  export type RecipeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * The filter to search for the Recipe to update in case it exists.
     */
    where: RecipeWhereUniqueInput
    /**
     * In case the Recipe found by the `where` argument doesn't exist, create a new Recipe with this data.
     */
    create: XOR<RecipeCreateInput, RecipeUncheckedCreateInput>
    /**
     * In case the Recipe was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecipeUpdateInput, RecipeUncheckedUpdateInput>
  }

  /**
   * Recipe delete
   */
  export type RecipeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter which Recipe to delete.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe deleteMany
   */
  export type RecipeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recipes to delete
     */
    where?: RecipeWhereInput
    /**
     * Limit how many Recipes to delete.
     */
    limit?: number
  }

  /**
   * Recipe.votes
   */
  export type Recipe$votesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    cursor?: VoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Recipe.bookmarks
   */
  export type Recipe$bookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    where?: BookmarkWhereInput
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    cursor?: BookmarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Recipe.tried
   */
  export type Recipe$triedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tried
     */
    select?: TriedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tried
     */
    omit?: TriedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriedInclude<ExtArgs> | null
    where?: TriedWhereInput
    orderBy?: TriedOrderByWithRelationInput | TriedOrderByWithRelationInput[]
    cursor?: TriedWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TriedScalarFieldEnum | TriedScalarFieldEnum[]
  }

  /**
   * Recipe.tags
   */
  export type Recipe$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeTag
     */
    select?: RecipeTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeTag
     */
    omit?: RecipeTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeTagInclude<ExtArgs> | null
    where?: RecipeTagWhereInput
    orderBy?: RecipeTagOrderByWithRelationInput | RecipeTagOrderByWithRelationInput[]
    cursor?: RecipeTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeTagScalarFieldEnum | RecipeTagScalarFieldEnum[]
  }

  /**
   * Recipe without action
   */
  export type RecipeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type TagMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    _all: number
  }


  export type TagMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    recipes?: boolean | Tag$recipesArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>



  export type TagSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipes?: boolean | Tag$recipesArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      recipes: Prisma.$RecipeTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recipes<T extends Tag$recipesArgs<ExtArgs> = {}>(args?: Subset<T, Tag$recipesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'String'>
    readonly name: FieldRef<"Tag", 'String'>
    readonly createdAt: FieldRef<"Tag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.recipes
   */
  export type Tag$recipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeTag
     */
    select?: RecipeTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeTag
     */
    omit?: RecipeTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeTagInclude<ExtArgs> | null
    where?: RecipeTagWhereInput
    orderBy?: RecipeTagOrderByWithRelationInput | RecipeTagOrderByWithRelationInput[]
    cursor?: RecipeTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeTagScalarFieldEnum | RecipeTagScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model RecipeTag
   */

  export type AggregateRecipeTag = {
    _count: RecipeTagCountAggregateOutputType | null
    _min: RecipeTagMinAggregateOutputType | null
    _max: RecipeTagMaxAggregateOutputType | null
  }

  export type RecipeTagMinAggregateOutputType = {
    recipeId: string | null
    tagId: string | null
    createdAt: Date | null
  }

  export type RecipeTagMaxAggregateOutputType = {
    recipeId: string | null
    tagId: string | null
    createdAt: Date | null
  }

  export type RecipeTagCountAggregateOutputType = {
    recipeId: number
    tagId: number
    createdAt: number
    _all: number
  }


  export type RecipeTagMinAggregateInputType = {
    recipeId?: true
    tagId?: true
    createdAt?: true
  }

  export type RecipeTagMaxAggregateInputType = {
    recipeId?: true
    tagId?: true
    createdAt?: true
  }

  export type RecipeTagCountAggregateInputType = {
    recipeId?: true
    tagId?: true
    createdAt?: true
    _all?: true
  }

  export type RecipeTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecipeTag to aggregate.
     */
    where?: RecipeTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeTags to fetch.
     */
    orderBy?: RecipeTagOrderByWithRelationInput | RecipeTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecipeTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecipeTags
    **/
    _count?: true | RecipeTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecipeTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecipeTagMaxAggregateInputType
  }

  export type GetRecipeTagAggregateType<T extends RecipeTagAggregateArgs> = {
        [P in keyof T & keyof AggregateRecipeTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipeTag[P]>
      : GetScalarType<T[P], AggregateRecipeTag[P]>
  }




  export type RecipeTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeTagWhereInput
    orderBy?: RecipeTagOrderByWithAggregationInput | RecipeTagOrderByWithAggregationInput[]
    by: RecipeTagScalarFieldEnum[] | RecipeTagScalarFieldEnum
    having?: RecipeTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecipeTagCountAggregateInputType | true
    _min?: RecipeTagMinAggregateInputType
    _max?: RecipeTagMaxAggregateInputType
  }

  export type RecipeTagGroupByOutputType = {
    recipeId: string
    tagId: string
    createdAt: Date
    _count: RecipeTagCountAggregateOutputType | null
    _min: RecipeTagMinAggregateOutputType | null
    _max: RecipeTagMaxAggregateOutputType | null
  }

  type GetRecipeTagGroupByPayload<T extends RecipeTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecipeTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecipeTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecipeTagGroupByOutputType[P]>
            : GetScalarType<T[P], RecipeTagGroupByOutputType[P]>
        }
      >
    >


  export type RecipeTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    recipeId?: boolean
    tagId?: boolean
    createdAt?: boolean
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipeTag"]>



  export type RecipeTagSelectScalar = {
    recipeId?: boolean
    tagId?: boolean
    createdAt?: boolean
  }

  export type RecipeTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"recipeId" | "tagId" | "createdAt", ExtArgs["result"]["recipeTag"]>
  export type RecipeTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $RecipeTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecipeTag"
    objects: {
      recipe: Prisma.$RecipePayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      recipeId: string
      tagId: string
      createdAt: Date
    }, ExtArgs["result"]["recipeTag"]>
    composites: {}
  }

  type RecipeTagGetPayload<S extends boolean | null | undefined | RecipeTagDefaultArgs> = $Result.GetResult<Prisma.$RecipeTagPayload, S>

  type RecipeTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecipeTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecipeTagCountAggregateInputType | true
    }

  export interface RecipeTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecipeTag'], meta: { name: 'RecipeTag' } }
    /**
     * Find zero or one RecipeTag that matches the filter.
     * @param {RecipeTagFindUniqueArgs} args - Arguments to find a RecipeTag
     * @example
     * // Get one RecipeTag
     * const recipeTag = await prisma.recipeTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecipeTagFindUniqueArgs>(args: SelectSubset<T, RecipeTagFindUniqueArgs<ExtArgs>>): Prisma__RecipeTagClient<$Result.GetResult<Prisma.$RecipeTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RecipeTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecipeTagFindUniqueOrThrowArgs} args - Arguments to find a RecipeTag
     * @example
     * // Get one RecipeTag
     * const recipeTag = await prisma.recipeTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecipeTagFindUniqueOrThrowArgs>(args: SelectSubset<T, RecipeTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecipeTagClient<$Result.GetResult<Prisma.$RecipeTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecipeTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeTagFindFirstArgs} args - Arguments to find a RecipeTag
     * @example
     * // Get one RecipeTag
     * const recipeTag = await prisma.recipeTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecipeTagFindFirstArgs>(args?: SelectSubset<T, RecipeTagFindFirstArgs<ExtArgs>>): Prisma__RecipeTagClient<$Result.GetResult<Prisma.$RecipeTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecipeTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeTagFindFirstOrThrowArgs} args - Arguments to find a RecipeTag
     * @example
     * // Get one RecipeTag
     * const recipeTag = await prisma.recipeTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecipeTagFindFirstOrThrowArgs>(args?: SelectSubset<T, RecipeTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecipeTagClient<$Result.GetResult<Prisma.$RecipeTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RecipeTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecipeTags
     * const recipeTags = await prisma.recipeTag.findMany()
     * 
     * // Get first 10 RecipeTags
     * const recipeTags = await prisma.recipeTag.findMany({ take: 10 })
     * 
     * // Only select the `recipeId`
     * const recipeTagWithRecipeIdOnly = await prisma.recipeTag.findMany({ select: { recipeId: true } })
     * 
     */
    findMany<T extends RecipeTagFindManyArgs>(args?: SelectSubset<T, RecipeTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RecipeTag.
     * @param {RecipeTagCreateArgs} args - Arguments to create a RecipeTag.
     * @example
     * // Create one RecipeTag
     * const RecipeTag = await prisma.recipeTag.create({
     *   data: {
     *     // ... data to create a RecipeTag
     *   }
     * })
     * 
     */
    create<T extends RecipeTagCreateArgs>(args: SelectSubset<T, RecipeTagCreateArgs<ExtArgs>>): Prisma__RecipeTagClient<$Result.GetResult<Prisma.$RecipeTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RecipeTags.
     * @param {RecipeTagCreateManyArgs} args - Arguments to create many RecipeTags.
     * @example
     * // Create many RecipeTags
     * const recipeTag = await prisma.recipeTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecipeTagCreateManyArgs>(args?: SelectSubset<T, RecipeTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RecipeTag.
     * @param {RecipeTagDeleteArgs} args - Arguments to delete one RecipeTag.
     * @example
     * // Delete one RecipeTag
     * const RecipeTag = await prisma.recipeTag.delete({
     *   where: {
     *     // ... filter to delete one RecipeTag
     *   }
     * })
     * 
     */
    delete<T extends RecipeTagDeleteArgs>(args: SelectSubset<T, RecipeTagDeleteArgs<ExtArgs>>): Prisma__RecipeTagClient<$Result.GetResult<Prisma.$RecipeTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RecipeTag.
     * @param {RecipeTagUpdateArgs} args - Arguments to update one RecipeTag.
     * @example
     * // Update one RecipeTag
     * const recipeTag = await prisma.recipeTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecipeTagUpdateArgs>(args: SelectSubset<T, RecipeTagUpdateArgs<ExtArgs>>): Prisma__RecipeTagClient<$Result.GetResult<Prisma.$RecipeTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RecipeTags.
     * @param {RecipeTagDeleteManyArgs} args - Arguments to filter RecipeTags to delete.
     * @example
     * // Delete a few RecipeTags
     * const { count } = await prisma.recipeTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecipeTagDeleteManyArgs>(args?: SelectSubset<T, RecipeTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecipeTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecipeTags
     * const recipeTag = await prisma.recipeTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecipeTagUpdateManyArgs>(args: SelectSubset<T, RecipeTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RecipeTag.
     * @param {RecipeTagUpsertArgs} args - Arguments to update or create a RecipeTag.
     * @example
     * // Update or create a RecipeTag
     * const recipeTag = await prisma.recipeTag.upsert({
     *   create: {
     *     // ... data to create a RecipeTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecipeTag we want to update
     *   }
     * })
     */
    upsert<T extends RecipeTagUpsertArgs>(args: SelectSubset<T, RecipeTagUpsertArgs<ExtArgs>>): Prisma__RecipeTagClient<$Result.GetResult<Prisma.$RecipeTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RecipeTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeTagCountArgs} args - Arguments to filter RecipeTags to count.
     * @example
     * // Count the number of RecipeTags
     * const count = await prisma.recipeTag.count({
     *   where: {
     *     // ... the filter for the RecipeTags we want to count
     *   }
     * })
    **/
    count<T extends RecipeTagCountArgs>(
      args?: Subset<T, RecipeTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecipeTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecipeTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecipeTagAggregateArgs>(args: Subset<T, RecipeTagAggregateArgs>): Prisma.PrismaPromise<GetRecipeTagAggregateType<T>>

    /**
     * Group by RecipeTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecipeTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecipeTagGroupByArgs['orderBy'] }
        : { orderBy?: RecipeTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecipeTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipeTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecipeTag model
   */
  readonly fields: RecipeTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecipeTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecipeTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recipe<T extends RecipeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RecipeDefaultArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecipeTag model
   */
  interface RecipeTagFieldRefs {
    readonly recipeId: FieldRef<"RecipeTag", 'String'>
    readonly tagId: FieldRef<"RecipeTag", 'String'>
    readonly createdAt: FieldRef<"RecipeTag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RecipeTag findUnique
   */
  export type RecipeTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeTag
     */
    select?: RecipeTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeTag
     */
    omit?: RecipeTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeTagInclude<ExtArgs> | null
    /**
     * Filter, which RecipeTag to fetch.
     */
    where: RecipeTagWhereUniqueInput
  }

  /**
   * RecipeTag findUniqueOrThrow
   */
  export type RecipeTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeTag
     */
    select?: RecipeTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeTag
     */
    omit?: RecipeTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeTagInclude<ExtArgs> | null
    /**
     * Filter, which RecipeTag to fetch.
     */
    where: RecipeTagWhereUniqueInput
  }

  /**
   * RecipeTag findFirst
   */
  export type RecipeTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeTag
     */
    select?: RecipeTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeTag
     */
    omit?: RecipeTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeTagInclude<ExtArgs> | null
    /**
     * Filter, which RecipeTag to fetch.
     */
    where?: RecipeTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeTags to fetch.
     */
    orderBy?: RecipeTagOrderByWithRelationInput | RecipeTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecipeTags.
     */
    cursor?: RecipeTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecipeTags.
     */
    distinct?: RecipeTagScalarFieldEnum | RecipeTagScalarFieldEnum[]
  }

  /**
   * RecipeTag findFirstOrThrow
   */
  export type RecipeTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeTag
     */
    select?: RecipeTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeTag
     */
    omit?: RecipeTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeTagInclude<ExtArgs> | null
    /**
     * Filter, which RecipeTag to fetch.
     */
    where?: RecipeTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeTags to fetch.
     */
    orderBy?: RecipeTagOrderByWithRelationInput | RecipeTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecipeTags.
     */
    cursor?: RecipeTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecipeTags.
     */
    distinct?: RecipeTagScalarFieldEnum | RecipeTagScalarFieldEnum[]
  }

  /**
   * RecipeTag findMany
   */
  export type RecipeTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeTag
     */
    select?: RecipeTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeTag
     */
    omit?: RecipeTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeTagInclude<ExtArgs> | null
    /**
     * Filter, which RecipeTags to fetch.
     */
    where?: RecipeTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeTags to fetch.
     */
    orderBy?: RecipeTagOrderByWithRelationInput | RecipeTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecipeTags.
     */
    cursor?: RecipeTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeTags.
     */
    skip?: number
    distinct?: RecipeTagScalarFieldEnum | RecipeTagScalarFieldEnum[]
  }

  /**
   * RecipeTag create
   */
  export type RecipeTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeTag
     */
    select?: RecipeTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeTag
     */
    omit?: RecipeTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeTagInclude<ExtArgs> | null
    /**
     * The data needed to create a RecipeTag.
     */
    data: XOR<RecipeTagCreateInput, RecipeTagUncheckedCreateInput>
  }

  /**
   * RecipeTag createMany
   */
  export type RecipeTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecipeTags.
     */
    data: RecipeTagCreateManyInput | RecipeTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecipeTag update
   */
  export type RecipeTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeTag
     */
    select?: RecipeTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeTag
     */
    omit?: RecipeTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeTagInclude<ExtArgs> | null
    /**
     * The data needed to update a RecipeTag.
     */
    data: XOR<RecipeTagUpdateInput, RecipeTagUncheckedUpdateInput>
    /**
     * Choose, which RecipeTag to update.
     */
    where: RecipeTagWhereUniqueInput
  }

  /**
   * RecipeTag updateMany
   */
  export type RecipeTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecipeTags.
     */
    data: XOR<RecipeTagUpdateManyMutationInput, RecipeTagUncheckedUpdateManyInput>
    /**
     * Filter which RecipeTags to update
     */
    where?: RecipeTagWhereInput
    /**
     * Limit how many RecipeTags to update.
     */
    limit?: number
  }

  /**
   * RecipeTag upsert
   */
  export type RecipeTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeTag
     */
    select?: RecipeTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeTag
     */
    omit?: RecipeTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeTagInclude<ExtArgs> | null
    /**
     * The filter to search for the RecipeTag to update in case it exists.
     */
    where: RecipeTagWhereUniqueInput
    /**
     * In case the RecipeTag found by the `where` argument doesn't exist, create a new RecipeTag with this data.
     */
    create: XOR<RecipeTagCreateInput, RecipeTagUncheckedCreateInput>
    /**
     * In case the RecipeTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecipeTagUpdateInput, RecipeTagUncheckedUpdateInput>
  }

  /**
   * RecipeTag delete
   */
  export type RecipeTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeTag
     */
    select?: RecipeTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeTag
     */
    omit?: RecipeTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeTagInclude<ExtArgs> | null
    /**
     * Filter which RecipeTag to delete.
     */
    where: RecipeTagWhereUniqueInput
  }

  /**
   * RecipeTag deleteMany
   */
  export type RecipeTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecipeTags to delete
     */
    where?: RecipeTagWhereInput
    /**
     * Limit how many RecipeTags to delete.
     */
    limit?: number
  }

  /**
   * RecipeTag without action
   */
  export type RecipeTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeTag
     */
    select?: RecipeTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeTag
     */
    omit?: RecipeTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeTagInclude<ExtArgs> | null
  }


  /**
   * Model Vote
   */

  export type AggregateVote = {
    _count: VoteCountAggregateOutputType | null
    _avg: VoteAvgAggregateOutputType | null
    _sum: VoteSumAggregateOutputType | null
    _min: VoteMinAggregateOutputType | null
    _max: VoteMaxAggregateOutputType | null
  }

  export type VoteAvgAggregateOutputType = {
    value: number | null
  }

  export type VoteSumAggregateOutputType = {
    value: number | null
  }

  export type VoteMinAggregateOutputType = {
    id: string | null
    value: number | null
    createdAt: Date | null
    userId: string | null
    recipeId: string | null
  }

  export type VoteMaxAggregateOutputType = {
    id: string | null
    value: number | null
    createdAt: Date | null
    userId: string | null
    recipeId: string | null
  }

  export type VoteCountAggregateOutputType = {
    id: number
    value: number
    createdAt: number
    userId: number
    recipeId: number
    _all: number
  }


  export type VoteAvgAggregateInputType = {
    value?: true
  }

  export type VoteSumAggregateInputType = {
    value?: true
  }

  export type VoteMinAggregateInputType = {
    id?: true
    value?: true
    createdAt?: true
    userId?: true
    recipeId?: true
  }

  export type VoteMaxAggregateInputType = {
    id?: true
    value?: true
    createdAt?: true
    userId?: true
    recipeId?: true
  }

  export type VoteCountAggregateInputType = {
    id?: true
    value?: true
    createdAt?: true
    userId?: true
    recipeId?: true
    _all?: true
  }

  export type VoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vote to aggregate.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Votes
    **/
    _count?: true | VoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VoteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VoteMaxAggregateInputType
  }

  export type GetVoteAggregateType<T extends VoteAggregateArgs> = {
        [P in keyof T & keyof AggregateVote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVote[P]>
      : GetScalarType<T[P], AggregateVote[P]>
  }




  export type VoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithAggregationInput | VoteOrderByWithAggregationInput[]
    by: VoteScalarFieldEnum[] | VoteScalarFieldEnum
    having?: VoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VoteCountAggregateInputType | true
    _avg?: VoteAvgAggregateInputType
    _sum?: VoteSumAggregateInputType
    _min?: VoteMinAggregateInputType
    _max?: VoteMaxAggregateInputType
  }

  export type VoteGroupByOutputType = {
    id: string
    value: number
    createdAt: Date
    userId: string
    recipeId: string
    _count: VoteCountAggregateOutputType | null
    _avg: VoteAvgAggregateOutputType | null
    _sum: VoteSumAggregateOutputType | null
    _min: VoteMinAggregateOutputType | null
    _max: VoteMaxAggregateOutputType | null
  }

  type GetVoteGroupByPayload<T extends VoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VoteGroupByOutputType[P]>
            : GetScalarType<T[P], VoteGroupByOutputType[P]>
        }
      >
    >


  export type VoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    createdAt?: boolean
    userId?: boolean
    recipeId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vote"]>



  export type VoteSelectScalar = {
    id?: boolean
    value?: boolean
    createdAt?: boolean
    userId?: boolean
    recipeId?: boolean
  }

  export type VoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "value" | "createdAt" | "userId" | "recipeId", ExtArgs["result"]["vote"]>
  export type VoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }

  export type $VotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vote"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      recipe: Prisma.$RecipePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      value: number
      createdAt: Date
      userId: string
      recipeId: string
    }, ExtArgs["result"]["vote"]>
    composites: {}
  }

  type VoteGetPayload<S extends boolean | null | undefined | VoteDefaultArgs> = $Result.GetResult<Prisma.$VotePayload, S>

  type VoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VoteCountAggregateInputType | true
    }

  export interface VoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vote'], meta: { name: 'Vote' } }
    /**
     * Find zero or one Vote that matches the filter.
     * @param {VoteFindUniqueArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VoteFindUniqueArgs>(args: SelectSubset<T, VoteFindUniqueArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VoteFindUniqueOrThrowArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VoteFindUniqueOrThrowArgs>(args: SelectSubset<T, VoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindFirstArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VoteFindFirstArgs>(args?: SelectSubset<T, VoteFindFirstArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindFirstOrThrowArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VoteFindFirstOrThrowArgs>(args?: SelectSubset<T, VoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Votes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Votes
     * const votes = await prisma.vote.findMany()
     * 
     * // Get first 10 Votes
     * const votes = await prisma.vote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const voteWithIdOnly = await prisma.vote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VoteFindManyArgs>(args?: SelectSubset<T, VoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vote.
     * @param {VoteCreateArgs} args - Arguments to create a Vote.
     * @example
     * // Create one Vote
     * const Vote = await prisma.vote.create({
     *   data: {
     *     // ... data to create a Vote
     *   }
     * })
     * 
     */
    create<T extends VoteCreateArgs>(args: SelectSubset<T, VoteCreateArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Votes.
     * @param {VoteCreateManyArgs} args - Arguments to create many Votes.
     * @example
     * // Create many Votes
     * const vote = await prisma.vote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VoteCreateManyArgs>(args?: SelectSubset<T, VoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Vote.
     * @param {VoteDeleteArgs} args - Arguments to delete one Vote.
     * @example
     * // Delete one Vote
     * const Vote = await prisma.vote.delete({
     *   where: {
     *     // ... filter to delete one Vote
     *   }
     * })
     * 
     */
    delete<T extends VoteDeleteArgs>(args: SelectSubset<T, VoteDeleteArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vote.
     * @param {VoteUpdateArgs} args - Arguments to update one Vote.
     * @example
     * // Update one Vote
     * const vote = await prisma.vote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VoteUpdateArgs>(args: SelectSubset<T, VoteUpdateArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Votes.
     * @param {VoteDeleteManyArgs} args - Arguments to filter Votes to delete.
     * @example
     * // Delete a few Votes
     * const { count } = await prisma.vote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VoteDeleteManyArgs>(args?: SelectSubset<T, VoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Votes
     * const vote = await prisma.vote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VoteUpdateManyArgs>(args: SelectSubset<T, VoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Vote.
     * @param {VoteUpsertArgs} args - Arguments to update or create a Vote.
     * @example
     * // Update or create a Vote
     * const vote = await prisma.vote.upsert({
     *   create: {
     *     // ... data to create a Vote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vote we want to update
     *   }
     * })
     */
    upsert<T extends VoteUpsertArgs>(args: SelectSubset<T, VoteUpsertArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteCountArgs} args - Arguments to filter Votes to count.
     * @example
     * // Count the number of Votes
     * const count = await prisma.vote.count({
     *   where: {
     *     // ... the filter for the Votes we want to count
     *   }
     * })
    **/
    count<T extends VoteCountArgs>(
      args?: Subset<T, VoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VoteAggregateArgs>(args: Subset<T, VoteAggregateArgs>): Prisma.PrismaPromise<GetVoteAggregateType<T>>

    /**
     * Group by Vote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VoteGroupByArgs['orderBy'] }
        : { orderBy?: VoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vote model
   */
  readonly fields: VoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    recipe<T extends RecipeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RecipeDefaultArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vote model
   */
  interface VoteFieldRefs {
    readonly id: FieldRef<"Vote", 'String'>
    readonly value: FieldRef<"Vote", 'Int'>
    readonly createdAt: FieldRef<"Vote", 'DateTime'>
    readonly userId: FieldRef<"Vote", 'String'>
    readonly recipeId: FieldRef<"Vote", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Vote findUnique
   */
  export type VoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote findUniqueOrThrow
   */
  export type VoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote findFirst
   */
  export type VoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Votes.
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Votes.
     */
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Vote findFirstOrThrow
   */
  export type VoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Votes.
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Votes.
     */
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Vote findMany
   */
  export type VoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Votes to fetch.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Votes.
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Vote create
   */
  export type VoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Vote.
     */
    data: XOR<VoteCreateInput, VoteUncheckedCreateInput>
  }

  /**
   * Vote createMany
   */
  export type VoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Votes.
     */
    data: VoteCreateManyInput | VoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vote update
   */
  export type VoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Vote.
     */
    data: XOR<VoteUpdateInput, VoteUncheckedUpdateInput>
    /**
     * Choose, which Vote to update.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote updateMany
   */
  export type VoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Votes.
     */
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyInput>
    /**
     * Filter which Votes to update
     */
    where?: VoteWhereInput
    /**
     * Limit how many Votes to update.
     */
    limit?: number
  }

  /**
   * Vote upsert
   */
  export type VoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Vote to update in case it exists.
     */
    where: VoteWhereUniqueInput
    /**
     * In case the Vote found by the `where` argument doesn't exist, create a new Vote with this data.
     */
    create: XOR<VoteCreateInput, VoteUncheckedCreateInput>
    /**
     * In case the Vote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VoteUpdateInput, VoteUncheckedUpdateInput>
  }

  /**
   * Vote delete
   */
  export type VoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter which Vote to delete.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote deleteMany
   */
  export type VoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Votes to delete
     */
    where?: VoteWhereInput
    /**
     * Limit how many Votes to delete.
     */
    limit?: number
  }

  /**
   * Vote without action
   */
  export type VoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
  }


  /**
   * Model Bookmark
   */

  export type AggregateBookmark = {
    _count: BookmarkCountAggregateOutputType | null
    _min: BookmarkMinAggregateOutputType | null
    _max: BookmarkMaxAggregateOutputType | null
  }

  export type BookmarkMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: string | null
    recipeId: string | null
  }

  export type BookmarkMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: string | null
    recipeId: string | null
  }

  export type BookmarkCountAggregateOutputType = {
    id: number
    createdAt: number
    userId: number
    recipeId: number
    _all: number
  }


  export type BookmarkMinAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    recipeId?: true
  }

  export type BookmarkMaxAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    recipeId?: true
  }

  export type BookmarkCountAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    recipeId?: true
    _all?: true
  }

  export type BookmarkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookmark to aggregate.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookmarks
    **/
    _count?: true | BookmarkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookmarkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookmarkMaxAggregateInputType
  }

  export type GetBookmarkAggregateType<T extends BookmarkAggregateArgs> = {
        [P in keyof T & keyof AggregateBookmark]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookmark[P]>
      : GetScalarType<T[P], AggregateBookmark[P]>
  }




  export type BookmarkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookmarkWhereInput
    orderBy?: BookmarkOrderByWithAggregationInput | BookmarkOrderByWithAggregationInput[]
    by: BookmarkScalarFieldEnum[] | BookmarkScalarFieldEnum
    having?: BookmarkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookmarkCountAggregateInputType | true
    _min?: BookmarkMinAggregateInputType
    _max?: BookmarkMaxAggregateInputType
  }

  export type BookmarkGroupByOutputType = {
    id: string
    createdAt: Date
    userId: string
    recipeId: string
    _count: BookmarkCountAggregateOutputType | null
    _min: BookmarkMinAggregateOutputType | null
    _max: BookmarkMaxAggregateOutputType | null
  }

  type GetBookmarkGroupByPayload<T extends BookmarkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookmarkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookmarkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookmarkGroupByOutputType[P]>
            : GetScalarType<T[P], BookmarkGroupByOutputType[P]>
        }
      >
    >


  export type BookmarkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    recipeId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookmark"]>



  export type BookmarkSelectScalar = {
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    recipeId?: boolean
  }

  export type BookmarkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "userId" | "recipeId", ExtArgs["result"]["bookmark"]>
  export type BookmarkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }

  export type $BookmarkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bookmark"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      recipe: Prisma.$RecipePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      userId: string
      recipeId: string
    }, ExtArgs["result"]["bookmark"]>
    composites: {}
  }

  type BookmarkGetPayload<S extends boolean | null | undefined | BookmarkDefaultArgs> = $Result.GetResult<Prisma.$BookmarkPayload, S>

  type BookmarkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookmarkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookmarkCountAggregateInputType | true
    }

  export interface BookmarkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bookmark'], meta: { name: 'Bookmark' } }
    /**
     * Find zero or one Bookmark that matches the filter.
     * @param {BookmarkFindUniqueArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookmarkFindUniqueArgs>(args: SelectSubset<T, BookmarkFindUniqueArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bookmark that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookmarkFindUniqueOrThrowArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookmarkFindUniqueOrThrowArgs>(args: SelectSubset<T, BookmarkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookmark that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFindFirstArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookmarkFindFirstArgs>(args?: SelectSubset<T, BookmarkFindFirstArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookmark that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFindFirstOrThrowArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookmarkFindFirstOrThrowArgs>(args?: SelectSubset<T, BookmarkFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookmarks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookmarks
     * const bookmarks = await prisma.bookmark.findMany()
     * 
     * // Get first 10 Bookmarks
     * const bookmarks = await prisma.bookmark.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookmarkWithIdOnly = await prisma.bookmark.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookmarkFindManyArgs>(args?: SelectSubset<T, BookmarkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bookmark.
     * @param {BookmarkCreateArgs} args - Arguments to create a Bookmark.
     * @example
     * // Create one Bookmark
     * const Bookmark = await prisma.bookmark.create({
     *   data: {
     *     // ... data to create a Bookmark
     *   }
     * })
     * 
     */
    create<T extends BookmarkCreateArgs>(args: SelectSubset<T, BookmarkCreateArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookmarks.
     * @param {BookmarkCreateManyArgs} args - Arguments to create many Bookmarks.
     * @example
     * // Create many Bookmarks
     * const bookmark = await prisma.bookmark.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookmarkCreateManyArgs>(args?: SelectSubset<T, BookmarkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Bookmark.
     * @param {BookmarkDeleteArgs} args - Arguments to delete one Bookmark.
     * @example
     * // Delete one Bookmark
     * const Bookmark = await prisma.bookmark.delete({
     *   where: {
     *     // ... filter to delete one Bookmark
     *   }
     * })
     * 
     */
    delete<T extends BookmarkDeleteArgs>(args: SelectSubset<T, BookmarkDeleteArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bookmark.
     * @param {BookmarkUpdateArgs} args - Arguments to update one Bookmark.
     * @example
     * // Update one Bookmark
     * const bookmark = await prisma.bookmark.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookmarkUpdateArgs>(args: SelectSubset<T, BookmarkUpdateArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookmarks.
     * @param {BookmarkDeleteManyArgs} args - Arguments to filter Bookmarks to delete.
     * @example
     * // Delete a few Bookmarks
     * const { count } = await prisma.bookmark.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookmarkDeleteManyArgs>(args?: SelectSubset<T, BookmarkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookmarks
     * const bookmark = await prisma.bookmark.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookmarkUpdateManyArgs>(args: SelectSubset<T, BookmarkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Bookmark.
     * @param {BookmarkUpsertArgs} args - Arguments to update or create a Bookmark.
     * @example
     * // Update or create a Bookmark
     * const bookmark = await prisma.bookmark.upsert({
     *   create: {
     *     // ... data to create a Bookmark
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bookmark we want to update
     *   }
     * })
     */
    upsert<T extends BookmarkUpsertArgs>(args: SelectSubset<T, BookmarkUpsertArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkCountArgs} args - Arguments to filter Bookmarks to count.
     * @example
     * // Count the number of Bookmarks
     * const count = await prisma.bookmark.count({
     *   where: {
     *     // ... the filter for the Bookmarks we want to count
     *   }
     * })
    **/
    count<T extends BookmarkCountArgs>(
      args?: Subset<T, BookmarkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookmarkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bookmark.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookmarkAggregateArgs>(args: Subset<T, BookmarkAggregateArgs>): Prisma.PrismaPromise<GetBookmarkAggregateType<T>>

    /**
     * Group by Bookmark.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookmarkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookmarkGroupByArgs['orderBy'] }
        : { orderBy?: BookmarkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookmarkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookmarkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bookmark model
   */
  readonly fields: BookmarkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bookmark.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookmarkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    recipe<T extends RecipeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RecipeDefaultArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Bookmark model
   */
  interface BookmarkFieldRefs {
    readonly id: FieldRef<"Bookmark", 'String'>
    readonly createdAt: FieldRef<"Bookmark", 'DateTime'>
    readonly userId: FieldRef<"Bookmark", 'String'>
    readonly recipeId: FieldRef<"Bookmark", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Bookmark findUnique
   */
  export type BookmarkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark findUniqueOrThrow
   */
  export type BookmarkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark findFirst
   */
  export type BookmarkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookmarks.
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookmarks.
     */
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Bookmark findFirstOrThrow
   */
  export type BookmarkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookmarks.
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookmarks.
     */
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Bookmark findMany
   */
  export type BookmarkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmarks to fetch.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookmarks.
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Bookmark create
   */
  export type BookmarkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * The data needed to create a Bookmark.
     */
    data: XOR<BookmarkCreateInput, BookmarkUncheckedCreateInput>
  }

  /**
   * Bookmark createMany
   */
  export type BookmarkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookmarks.
     */
    data: BookmarkCreateManyInput | BookmarkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bookmark update
   */
  export type BookmarkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * The data needed to update a Bookmark.
     */
    data: XOR<BookmarkUpdateInput, BookmarkUncheckedUpdateInput>
    /**
     * Choose, which Bookmark to update.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark updateMany
   */
  export type BookmarkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookmarks.
     */
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyInput>
    /**
     * Filter which Bookmarks to update
     */
    where?: BookmarkWhereInput
    /**
     * Limit how many Bookmarks to update.
     */
    limit?: number
  }

  /**
   * Bookmark upsert
   */
  export type BookmarkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * The filter to search for the Bookmark to update in case it exists.
     */
    where: BookmarkWhereUniqueInput
    /**
     * In case the Bookmark found by the `where` argument doesn't exist, create a new Bookmark with this data.
     */
    create: XOR<BookmarkCreateInput, BookmarkUncheckedCreateInput>
    /**
     * In case the Bookmark was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookmarkUpdateInput, BookmarkUncheckedUpdateInput>
  }

  /**
   * Bookmark delete
   */
  export type BookmarkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter which Bookmark to delete.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark deleteMany
   */
  export type BookmarkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookmarks to delete
     */
    where?: BookmarkWhereInput
    /**
     * Limit how many Bookmarks to delete.
     */
    limit?: number
  }

  /**
   * Bookmark without action
   */
  export type BookmarkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
  }


  /**
   * Model Tried
   */

  export type AggregateTried = {
    _count: TriedCountAggregateOutputType | null
    _min: TriedMinAggregateOutputType | null
    _max: TriedMaxAggregateOutputType | null
  }

  export type TriedMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: string | null
    recipeId: string | null
  }

  export type TriedMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: string | null
    recipeId: string | null
  }

  export type TriedCountAggregateOutputType = {
    id: number
    createdAt: number
    userId: number
    recipeId: number
    _all: number
  }


  export type TriedMinAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    recipeId?: true
  }

  export type TriedMaxAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    recipeId?: true
  }

  export type TriedCountAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    recipeId?: true
    _all?: true
  }

  export type TriedAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tried to aggregate.
     */
    where?: TriedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trieds to fetch.
     */
    orderBy?: TriedOrderByWithRelationInput | TriedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TriedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trieds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trieds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trieds
    **/
    _count?: true | TriedCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TriedMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TriedMaxAggregateInputType
  }

  export type GetTriedAggregateType<T extends TriedAggregateArgs> = {
        [P in keyof T & keyof AggregateTried]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTried[P]>
      : GetScalarType<T[P], AggregateTried[P]>
  }




  export type TriedGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TriedWhereInput
    orderBy?: TriedOrderByWithAggregationInput | TriedOrderByWithAggregationInput[]
    by: TriedScalarFieldEnum[] | TriedScalarFieldEnum
    having?: TriedScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TriedCountAggregateInputType | true
    _min?: TriedMinAggregateInputType
    _max?: TriedMaxAggregateInputType
  }

  export type TriedGroupByOutputType = {
    id: string
    createdAt: Date
    userId: string
    recipeId: string
    _count: TriedCountAggregateOutputType | null
    _min: TriedMinAggregateOutputType | null
    _max: TriedMaxAggregateOutputType | null
  }

  type GetTriedGroupByPayload<T extends TriedGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TriedGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TriedGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TriedGroupByOutputType[P]>
            : GetScalarType<T[P], TriedGroupByOutputType[P]>
        }
      >
    >


  export type TriedSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    recipeId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tried"]>



  export type TriedSelectScalar = {
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    recipeId?: boolean
  }

  export type TriedOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "userId" | "recipeId", ExtArgs["result"]["tried"]>
  export type TriedInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }

  export type $TriedPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tried"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      recipe: Prisma.$RecipePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      userId: string
      recipeId: string
    }, ExtArgs["result"]["tried"]>
    composites: {}
  }

  type TriedGetPayload<S extends boolean | null | undefined | TriedDefaultArgs> = $Result.GetResult<Prisma.$TriedPayload, S>

  type TriedCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TriedFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TriedCountAggregateInputType | true
    }

  export interface TriedDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tried'], meta: { name: 'Tried' } }
    /**
     * Find zero or one Tried that matches the filter.
     * @param {TriedFindUniqueArgs} args - Arguments to find a Tried
     * @example
     * // Get one Tried
     * const tried = await prisma.tried.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TriedFindUniqueArgs>(args: SelectSubset<T, TriedFindUniqueArgs<ExtArgs>>): Prisma__TriedClient<$Result.GetResult<Prisma.$TriedPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tried that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TriedFindUniqueOrThrowArgs} args - Arguments to find a Tried
     * @example
     * // Get one Tried
     * const tried = await prisma.tried.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TriedFindUniqueOrThrowArgs>(args: SelectSubset<T, TriedFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TriedClient<$Result.GetResult<Prisma.$TriedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tried that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriedFindFirstArgs} args - Arguments to find a Tried
     * @example
     * // Get one Tried
     * const tried = await prisma.tried.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TriedFindFirstArgs>(args?: SelectSubset<T, TriedFindFirstArgs<ExtArgs>>): Prisma__TriedClient<$Result.GetResult<Prisma.$TriedPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tried that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriedFindFirstOrThrowArgs} args - Arguments to find a Tried
     * @example
     * // Get one Tried
     * const tried = await prisma.tried.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TriedFindFirstOrThrowArgs>(args?: SelectSubset<T, TriedFindFirstOrThrowArgs<ExtArgs>>): Prisma__TriedClient<$Result.GetResult<Prisma.$TriedPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trieds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriedFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trieds
     * const trieds = await prisma.tried.findMany()
     * 
     * // Get first 10 Trieds
     * const trieds = await prisma.tried.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const triedWithIdOnly = await prisma.tried.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TriedFindManyArgs>(args?: SelectSubset<T, TriedFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TriedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tried.
     * @param {TriedCreateArgs} args - Arguments to create a Tried.
     * @example
     * // Create one Tried
     * const Tried = await prisma.tried.create({
     *   data: {
     *     // ... data to create a Tried
     *   }
     * })
     * 
     */
    create<T extends TriedCreateArgs>(args: SelectSubset<T, TriedCreateArgs<ExtArgs>>): Prisma__TriedClient<$Result.GetResult<Prisma.$TriedPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trieds.
     * @param {TriedCreateManyArgs} args - Arguments to create many Trieds.
     * @example
     * // Create many Trieds
     * const tried = await prisma.tried.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TriedCreateManyArgs>(args?: SelectSubset<T, TriedCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tried.
     * @param {TriedDeleteArgs} args - Arguments to delete one Tried.
     * @example
     * // Delete one Tried
     * const Tried = await prisma.tried.delete({
     *   where: {
     *     // ... filter to delete one Tried
     *   }
     * })
     * 
     */
    delete<T extends TriedDeleteArgs>(args: SelectSubset<T, TriedDeleteArgs<ExtArgs>>): Prisma__TriedClient<$Result.GetResult<Prisma.$TriedPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tried.
     * @param {TriedUpdateArgs} args - Arguments to update one Tried.
     * @example
     * // Update one Tried
     * const tried = await prisma.tried.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TriedUpdateArgs>(args: SelectSubset<T, TriedUpdateArgs<ExtArgs>>): Prisma__TriedClient<$Result.GetResult<Prisma.$TriedPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trieds.
     * @param {TriedDeleteManyArgs} args - Arguments to filter Trieds to delete.
     * @example
     * // Delete a few Trieds
     * const { count } = await prisma.tried.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TriedDeleteManyArgs>(args?: SelectSubset<T, TriedDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trieds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriedUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trieds
     * const tried = await prisma.tried.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TriedUpdateManyArgs>(args: SelectSubset<T, TriedUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tried.
     * @param {TriedUpsertArgs} args - Arguments to update or create a Tried.
     * @example
     * // Update or create a Tried
     * const tried = await prisma.tried.upsert({
     *   create: {
     *     // ... data to create a Tried
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tried we want to update
     *   }
     * })
     */
    upsert<T extends TriedUpsertArgs>(args: SelectSubset<T, TriedUpsertArgs<ExtArgs>>): Prisma__TriedClient<$Result.GetResult<Prisma.$TriedPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trieds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriedCountArgs} args - Arguments to filter Trieds to count.
     * @example
     * // Count the number of Trieds
     * const count = await prisma.tried.count({
     *   where: {
     *     // ... the filter for the Trieds we want to count
     *   }
     * })
    **/
    count<T extends TriedCountArgs>(
      args?: Subset<T, TriedCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TriedCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tried.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriedAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TriedAggregateArgs>(args: Subset<T, TriedAggregateArgs>): Prisma.PrismaPromise<GetTriedAggregateType<T>>

    /**
     * Group by Tried.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriedGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TriedGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TriedGroupByArgs['orderBy'] }
        : { orderBy?: TriedGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TriedGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTriedGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tried model
   */
  readonly fields: TriedFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tried.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TriedClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    recipe<T extends RecipeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RecipeDefaultArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tried model
   */
  interface TriedFieldRefs {
    readonly id: FieldRef<"Tried", 'String'>
    readonly createdAt: FieldRef<"Tried", 'DateTime'>
    readonly userId: FieldRef<"Tried", 'String'>
    readonly recipeId: FieldRef<"Tried", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tried findUnique
   */
  export type TriedFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tried
     */
    select?: TriedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tried
     */
    omit?: TriedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriedInclude<ExtArgs> | null
    /**
     * Filter, which Tried to fetch.
     */
    where: TriedWhereUniqueInput
  }

  /**
   * Tried findUniqueOrThrow
   */
  export type TriedFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tried
     */
    select?: TriedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tried
     */
    omit?: TriedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriedInclude<ExtArgs> | null
    /**
     * Filter, which Tried to fetch.
     */
    where: TriedWhereUniqueInput
  }

  /**
   * Tried findFirst
   */
  export type TriedFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tried
     */
    select?: TriedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tried
     */
    omit?: TriedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriedInclude<ExtArgs> | null
    /**
     * Filter, which Tried to fetch.
     */
    where?: TriedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trieds to fetch.
     */
    orderBy?: TriedOrderByWithRelationInput | TriedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trieds.
     */
    cursor?: TriedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trieds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trieds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trieds.
     */
    distinct?: TriedScalarFieldEnum | TriedScalarFieldEnum[]
  }

  /**
   * Tried findFirstOrThrow
   */
  export type TriedFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tried
     */
    select?: TriedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tried
     */
    omit?: TriedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriedInclude<ExtArgs> | null
    /**
     * Filter, which Tried to fetch.
     */
    where?: TriedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trieds to fetch.
     */
    orderBy?: TriedOrderByWithRelationInput | TriedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trieds.
     */
    cursor?: TriedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trieds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trieds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trieds.
     */
    distinct?: TriedScalarFieldEnum | TriedScalarFieldEnum[]
  }

  /**
   * Tried findMany
   */
  export type TriedFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tried
     */
    select?: TriedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tried
     */
    omit?: TriedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriedInclude<ExtArgs> | null
    /**
     * Filter, which Trieds to fetch.
     */
    where?: TriedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trieds to fetch.
     */
    orderBy?: TriedOrderByWithRelationInput | TriedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trieds.
     */
    cursor?: TriedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trieds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trieds.
     */
    skip?: number
    distinct?: TriedScalarFieldEnum | TriedScalarFieldEnum[]
  }

  /**
   * Tried create
   */
  export type TriedCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tried
     */
    select?: TriedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tried
     */
    omit?: TriedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriedInclude<ExtArgs> | null
    /**
     * The data needed to create a Tried.
     */
    data: XOR<TriedCreateInput, TriedUncheckedCreateInput>
  }

  /**
   * Tried createMany
   */
  export type TriedCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trieds.
     */
    data: TriedCreateManyInput | TriedCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tried update
   */
  export type TriedUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tried
     */
    select?: TriedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tried
     */
    omit?: TriedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriedInclude<ExtArgs> | null
    /**
     * The data needed to update a Tried.
     */
    data: XOR<TriedUpdateInput, TriedUncheckedUpdateInput>
    /**
     * Choose, which Tried to update.
     */
    where: TriedWhereUniqueInput
  }

  /**
   * Tried updateMany
   */
  export type TriedUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trieds.
     */
    data: XOR<TriedUpdateManyMutationInput, TriedUncheckedUpdateManyInput>
    /**
     * Filter which Trieds to update
     */
    where?: TriedWhereInput
    /**
     * Limit how many Trieds to update.
     */
    limit?: number
  }

  /**
   * Tried upsert
   */
  export type TriedUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tried
     */
    select?: TriedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tried
     */
    omit?: TriedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriedInclude<ExtArgs> | null
    /**
     * The filter to search for the Tried to update in case it exists.
     */
    where: TriedWhereUniqueInput
    /**
     * In case the Tried found by the `where` argument doesn't exist, create a new Tried with this data.
     */
    create: XOR<TriedCreateInput, TriedUncheckedCreateInput>
    /**
     * In case the Tried was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TriedUpdateInput, TriedUncheckedUpdateInput>
  }

  /**
   * Tried delete
   */
  export type TriedDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tried
     */
    select?: TriedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tried
     */
    omit?: TriedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriedInclude<ExtArgs> | null
    /**
     * Filter which Tried to delete.
     */
    where: TriedWhereUniqueInput
  }

  /**
   * Tried deleteMany
   */
  export type TriedDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trieds to delete
     */
    where?: TriedWhereInput
    /**
     * Limit how many Trieds to delete.
     */
    limit?: number
  }

  /**
   * Tried without action
   */
  export type TriedDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tried
     */
    select?: TriedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tried
     */
    omit?: TriedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriedInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RecipeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    instructions: 'instructions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    authorId: 'authorId'
  };

  export type RecipeScalarFieldEnum = (typeof RecipeScalarFieldEnum)[keyof typeof RecipeScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const RecipeTagScalarFieldEnum: {
    recipeId: 'recipeId',
    tagId: 'tagId',
    createdAt: 'createdAt'
  };

  export type RecipeTagScalarFieldEnum = (typeof RecipeTagScalarFieldEnum)[keyof typeof RecipeTagScalarFieldEnum]


  export const VoteScalarFieldEnum: {
    id: 'id',
    value: 'value',
    createdAt: 'createdAt',
    userId: 'userId',
    recipeId: 'recipeId'
  };

  export type VoteScalarFieldEnum = (typeof VoteScalarFieldEnum)[keyof typeof VoteScalarFieldEnum]


  export const BookmarkScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    userId: 'userId',
    recipeId: 'recipeId'
  };

  export type BookmarkScalarFieldEnum = (typeof BookmarkScalarFieldEnum)[keyof typeof BookmarkScalarFieldEnum]


  export const TriedScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    userId: 'userId',
    recipeId: 'recipeId'
  };

  export type TriedScalarFieldEnum = (typeof TriedScalarFieldEnum)[keyof typeof TriedScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    image: 'image'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const RecipeOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    instructions: 'instructions',
    authorId: 'authorId'
  };

  export type RecipeOrderByRelevanceFieldEnum = (typeof RecipeOrderByRelevanceFieldEnum)[keyof typeof RecipeOrderByRelevanceFieldEnum]


  export const TagOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type TagOrderByRelevanceFieldEnum = (typeof TagOrderByRelevanceFieldEnum)[keyof typeof TagOrderByRelevanceFieldEnum]


  export const RecipeTagOrderByRelevanceFieldEnum: {
    recipeId: 'recipeId',
    tagId: 'tagId'
  };

  export type RecipeTagOrderByRelevanceFieldEnum = (typeof RecipeTagOrderByRelevanceFieldEnum)[keyof typeof RecipeTagOrderByRelevanceFieldEnum]


  export const VoteOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    recipeId: 'recipeId'
  };

  export type VoteOrderByRelevanceFieldEnum = (typeof VoteOrderByRelevanceFieldEnum)[keyof typeof VoteOrderByRelevanceFieldEnum]


  export const BookmarkOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    recipeId: 'recipeId'
  };

  export type BookmarkOrderByRelevanceFieldEnum = (typeof BookmarkOrderByRelevanceFieldEnum)[keyof typeof BookmarkOrderByRelevanceFieldEnum]


  export const TriedOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    recipeId: 'recipeId'
  };

  export type TriedOrderByRelevanceFieldEnum = (typeof TriedOrderByRelevanceFieldEnum)[keyof typeof TriedOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    recipes?: RecipeListRelationFilter
    votes?: VoteListRelationFilter
    bookmarks?: BookmarkListRelationFilter
    tried?: TriedListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recipes?: RecipeOrderByRelationAggregateInput
    votes?: VoteOrderByRelationAggregateInput
    bookmarks?: BookmarkOrderByRelationAggregateInput
    tried?: TriedOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    recipes?: RecipeListRelationFilter
    votes?: VoteListRelationFilter
    bookmarks?: BookmarkListRelationFilter
    tried?: TriedListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type RecipeWhereInput = {
    AND?: RecipeWhereInput | RecipeWhereInput[]
    OR?: RecipeWhereInput[]
    NOT?: RecipeWhereInput | RecipeWhereInput[]
    id?: StringFilter<"Recipe"> | string
    name?: StringFilter<"Recipe"> | string
    description?: StringFilter<"Recipe"> | string
    instructions?: StringFilter<"Recipe"> | string
    createdAt?: DateTimeFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeFilter<"Recipe"> | Date | string
    authorId?: StringFilter<"Recipe"> | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    votes?: VoteListRelationFilter
    bookmarks?: BookmarkListRelationFilter
    tried?: TriedListRelationFilter
    tags?: RecipeTagListRelationFilter
  }

  export type RecipeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    instructions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    author?: UserOrderByWithRelationInput
    votes?: VoteOrderByRelationAggregateInput
    bookmarks?: BookmarkOrderByRelationAggregateInput
    tried?: TriedOrderByRelationAggregateInput
    tags?: RecipeTagOrderByRelationAggregateInput
    _relevance?: RecipeOrderByRelevanceInput
  }

  export type RecipeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecipeWhereInput | RecipeWhereInput[]
    OR?: RecipeWhereInput[]
    NOT?: RecipeWhereInput | RecipeWhereInput[]
    name?: StringFilter<"Recipe"> | string
    description?: StringFilter<"Recipe"> | string
    instructions?: StringFilter<"Recipe"> | string
    createdAt?: DateTimeFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeFilter<"Recipe"> | Date | string
    authorId?: StringFilter<"Recipe"> | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    votes?: VoteListRelationFilter
    bookmarks?: BookmarkListRelationFilter
    tried?: TriedListRelationFilter
    tags?: RecipeTagListRelationFilter
  }, "id">

  export type RecipeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    instructions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    _count?: RecipeCountOrderByAggregateInput
    _max?: RecipeMaxOrderByAggregateInput
    _min?: RecipeMinOrderByAggregateInput
  }

  export type RecipeScalarWhereWithAggregatesInput = {
    AND?: RecipeScalarWhereWithAggregatesInput | RecipeScalarWhereWithAggregatesInput[]
    OR?: RecipeScalarWhereWithAggregatesInput[]
    NOT?: RecipeScalarWhereWithAggregatesInput | RecipeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Recipe"> | string
    name?: StringWithAggregatesFilter<"Recipe"> | string
    description?: StringWithAggregatesFilter<"Recipe"> | string
    instructions?: StringWithAggregatesFilter<"Recipe"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Recipe"> | Date | string
    authorId?: StringWithAggregatesFilter<"Recipe"> | string
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: StringFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
    createdAt?: DateTimeFilter<"Tag"> | Date | string
    recipes?: RecipeTagListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    recipes?: RecipeTagOrderByRelationAggregateInput
    _relevance?: TagOrderByRelevanceInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    createdAt?: DateTimeFilter<"Tag"> | Date | string
    recipes?: RecipeTagListRelationFilter
  }, "id" | "name">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tag"> | string
    name?: StringWithAggregatesFilter<"Tag"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Tag"> | Date | string
  }

  export type RecipeTagWhereInput = {
    AND?: RecipeTagWhereInput | RecipeTagWhereInput[]
    OR?: RecipeTagWhereInput[]
    NOT?: RecipeTagWhereInput | RecipeTagWhereInput[]
    recipeId?: StringFilter<"RecipeTag"> | string
    tagId?: StringFilter<"RecipeTag"> | string
    createdAt?: DateTimeFilter<"RecipeTag"> | Date | string
    recipe?: XOR<RecipeScalarRelationFilter, RecipeWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }

  export type RecipeTagOrderByWithRelationInput = {
    recipeId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
    recipe?: RecipeOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
    _relevance?: RecipeTagOrderByRelevanceInput
  }

  export type RecipeTagWhereUniqueInput = Prisma.AtLeast<{
    recipeId_tagId?: RecipeTagRecipeIdTagIdCompoundUniqueInput
    AND?: RecipeTagWhereInput | RecipeTagWhereInput[]
    OR?: RecipeTagWhereInput[]
    NOT?: RecipeTagWhereInput | RecipeTagWhereInput[]
    recipeId?: StringFilter<"RecipeTag"> | string
    tagId?: StringFilter<"RecipeTag"> | string
    createdAt?: DateTimeFilter<"RecipeTag"> | Date | string
    recipe?: XOR<RecipeScalarRelationFilter, RecipeWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }, "recipeId_tagId">

  export type RecipeTagOrderByWithAggregationInput = {
    recipeId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
    _count?: RecipeTagCountOrderByAggregateInput
    _max?: RecipeTagMaxOrderByAggregateInput
    _min?: RecipeTagMinOrderByAggregateInput
  }

  export type RecipeTagScalarWhereWithAggregatesInput = {
    AND?: RecipeTagScalarWhereWithAggregatesInput | RecipeTagScalarWhereWithAggregatesInput[]
    OR?: RecipeTagScalarWhereWithAggregatesInput[]
    NOT?: RecipeTagScalarWhereWithAggregatesInput | RecipeTagScalarWhereWithAggregatesInput[]
    recipeId?: StringWithAggregatesFilter<"RecipeTag"> | string
    tagId?: StringWithAggregatesFilter<"RecipeTag"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RecipeTag"> | Date | string
  }

  export type VoteWhereInput = {
    AND?: VoteWhereInput | VoteWhereInput[]
    OR?: VoteWhereInput[]
    NOT?: VoteWhereInput | VoteWhereInput[]
    id?: StringFilter<"Vote"> | string
    value?: IntFilter<"Vote"> | number
    createdAt?: DateTimeFilter<"Vote"> | Date | string
    userId?: StringFilter<"Vote"> | string
    recipeId?: StringFilter<"Vote"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    recipe?: XOR<RecipeScalarRelationFilter, RecipeWhereInput>
  }

  export type VoteOrderByWithRelationInput = {
    id?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
    user?: UserOrderByWithRelationInput
    recipe?: RecipeOrderByWithRelationInput
    _relevance?: VoteOrderByRelevanceInput
  }

  export type VoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_recipeId?: VoteUserIdRecipeIdCompoundUniqueInput
    AND?: VoteWhereInput | VoteWhereInput[]
    OR?: VoteWhereInput[]
    NOT?: VoteWhereInput | VoteWhereInput[]
    value?: IntFilter<"Vote"> | number
    createdAt?: DateTimeFilter<"Vote"> | Date | string
    userId?: StringFilter<"Vote"> | string
    recipeId?: StringFilter<"Vote"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    recipe?: XOR<RecipeScalarRelationFilter, RecipeWhereInput>
  }, "id" | "userId_recipeId">

  export type VoteOrderByWithAggregationInput = {
    id?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
    _count?: VoteCountOrderByAggregateInput
    _avg?: VoteAvgOrderByAggregateInput
    _max?: VoteMaxOrderByAggregateInput
    _min?: VoteMinOrderByAggregateInput
    _sum?: VoteSumOrderByAggregateInput
  }

  export type VoteScalarWhereWithAggregatesInput = {
    AND?: VoteScalarWhereWithAggregatesInput | VoteScalarWhereWithAggregatesInput[]
    OR?: VoteScalarWhereWithAggregatesInput[]
    NOT?: VoteScalarWhereWithAggregatesInput | VoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vote"> | string
    value?: IntWithAggregatesFilter<"Vote"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Vote"> | Date | string
    userId?: StringWithAggregatesFilter<"Vote"> | string
    recipeId?: StringWithAggregatesFilter<"Vote"> | string
  }

  export type BookmarkWhereInput = {
    AND?: BookmarkWhereInput | BookmarkWhereInput[]
    OR?: BookmarkWhereInput[]
    NOT?: BookmarkWhereInput | BookmarkWhereInput[]
    id?: StringFilter<"Bookmark"> | string
    createdAt?: DateTimeFilter<"Bookmark"> | Date | string
    userId?: StringFilter<"Bookmark"> | string
    recipeId?: StringFilter<"Bookmark"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    recipe?: XOR<RecipeScalarRelationFilter, RecipeWhereInput>
  }

  export type BookmarkOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
    user?: UserOrderByWithRelationInput
    recipe?: RecipeOrderByWithRelationInput
    _relevance?: BookmarkOrderByRelevanceInput
  }

  export type BookmarkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_recipeId?: BookmarkUserIdRecipeIdCompoundUniqueInput
    AND?: BookmarkWhereInput | BookmarkWhereInput[]
    OR?: BookmarkWhereInput[]
    NOT?: BookmarkWhereInput | BookmarkWhereInput[]
    createdAt?: DateTimeFilter<"Bookmark"> | Date | string
    userId?: StringFilter<"Bookmark"> | string
    recipeId?: StringFilter<"Bookmark"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    recipe?: XOR<RecipeScalarRelationFilter, RecipeWhereInput>
  }, "id" | "userId_recipeId">

  export type BookmarkOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
    _count?: BookmarkCountOrderByAggregateInput
    _max?: BookmarkMaxOrderByAggregateInput
    _min?: BookmarkMinOrderByAggregateInput
  }

  export type BookmarkScalarWhereWithAggregatesInput = {
    AND?: BookmarkScalarWhereWithAggregatesInput | BookmarkScalarWhereWithAggregatesInput[]
    OR?: BookmarkScalarWhereWithAggregatesInput[]
    NOT?: BookmarkScalarWhereWithAggregatesInput | BookmarkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Bookmark"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Bookmark"> | Date | string
    userId?: StringWithAggregatesFilter<"Bookmark"> | string
    recipeId?: StringWithAggregatesFilter<"Bookmark"> | string
  }

  export type TriedWhereInput = {
    AND?: TriedWhereInput | TriedWhereInput[]
    OR?: TriedWhereInput[]
    NOT?: TriedWhereInput | TriedWhereInput[]
    id?: StringFilter<"Tried"> | string
    createdAt?: DateTimeFilter<"Tried"> | Date | string
    userId?: StringFilter<"Tried"> | string
    recipeId?: StringFilter<"Tried"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    recipe?: XOR<RecipeScalarRelationFilter, RecipeWhereInput>
  }

  export type TriedOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
    user?: UserOrderByWithRelationInput
    recipe?: RecipeOrderByWithRelationInput
    _relevance?: TriedOrderByRelevanceInput
  }

  export type TriedWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_recipeId?: TriedUserIdRecipeIdCompoundUniqueInput
    AND?: TriedWhereInput | TriedWhereInput[]
    OR?: TriedWhereInput[]
    NOT?: TriedWhereInput | TriedWhereInput[]
    createdAt?: DateTimeFilter<"Tried"> | Date | string
    userId?: StringFilter<"Tried"> | string
    recipeId?: StringFilter<"Tried"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    recipe?: XOR<RecipeScalarRelationFilter, RecipeWhereInput>
  }, "id" | "userId_recipeId">

  export type TriedOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
    _count?: TriedCountOrderByAggregateInput
    _max?: TriedMaxOrderByAggregateInput
    _min?: TriedMinOrderByAggregateInput
  }

  export type TriedScalarWhereWithAggregatesInput = {
    AND?: TriedScalarWhereWithAggregatesInput | TriedScalarWhereWithAggregatesInput[]
    OR?: TriedScalarWhereWithAggregatesInput[]
    NOT?: TriedScalarWhereWithAggregatesInput | TriedScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tried"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Tried"> | Date | string
    userId?: StringWithAggregatesFilter<"Tried"> | string
    recipeId?: StringWithAggregatesFilter<"Tried"> | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recipes?: RecipeCreateNestedManyWithoutAuthorInput
    votes?: VoteCreateNestedManyWithoutUserInput
    bookmarks?: BookmarkCreateNestedManyWithoutUserInput
    tried?: TriedCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recipes?: RecipeUncheckedCreateNestedManyWithoutAuthorInput
    votes?: VoteUncheckedCreateNestedManyWithoutUserInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutUserInput
    tried?: TriedUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: RecipeUpdateManyWithoutAuthorNestedInput
    votes?: VoteUpdateManyWithoutUserNestedInput
    bookmarks?: BookmarkUpdateManyWithoutUserNestedInput
    tried?: TriedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: RecipeUncheckedUpdateManyWithoutAuthorNestedInput
    votes?: VoteUncheckedUpdateManyWithoutUserNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutUserNestedInput
    tried?: TriedUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeCreateInput = {
    id?: string
    name: string
    description: string
    instructions: string
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutRecipesInput
    votes?: VoteCreateNestedManyWithoutRecipeInput
    bookmarks?: BookmarkCreateNestedManyWithoutRecipeInput
    tried?: TriedCreateNestedManyWithoutRecipeInput
    tags?: RecipeTagCreateNestedManyWithoutRecipeInput
  }

  export type RecipeUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    instructions: string
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    votes?: VoteUncheckedCreateNestedManyWithoutRecipeInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutRecipeInput
    tried?: TriedUncheckedCreateNestedManyWithoutRecipeInput
    tags?: RecipeTagUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type RecipeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutRecipesNestedInput
    votes?: VoteUpdateManyWithoutRecipeNestedInput
    bookmarks?: BookmarkUpdateManyWithoutRecipeNestedInput
    tried?: TriedUpdateManyWithoutRecipeNestedInput
    tags?: RecipeTagUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    votes?: VoteUncheckedUpdateManyWithoutRecipeNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutRecipeNestedInput
    tried?: TriedUncheckedUpdateManyWithoutRecipeNestedInput
    tags?: RecipeTagUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeCreateManyInput = {
    id?: string
    name: string
    description: string
    instructions: string
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
  }

  export type RecipeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type TagCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    recipes?: RecipeTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    recipes?: RecipeTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: RecipeTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: RecipeTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type TagCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type TagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeTagCreateInput = {
    createdAt?: Date | string
    recipe: RecipeCreateNestedOneWithoutTagsInput
    tag: TagCreateNestedOneWithoutRecipesInput
  }

  export type RecipeTagUncheckedCreateInput = {
    recipeId: string
    tagId: string
    createdAt?: Date | string
  }

  export type RecipeTagUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe?: RecipeUpdateOneRequiredWithoutTagsNestedInput
    tag?: TagUpdateOneRequiredWithoutRecipesNestedInput
  }

  export type RecipeTagUncheckedUpdateInput = {
    recipeId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeTagCreateManyInput = {
    recipeId: string
    tagId: string
    createdAt?: Date | string
  }

  export type RecipeTagUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeTagUncheckedUpdateManyInput = {
    recipeId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteCreateInput = {
    id?: string
    value: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutVotesInput
    recipe: RecipeCreateNestedOneWithoutVotesInput
  }

  export type VoteUncheckedCreateInput = {
    id?: string
    value: number
    createdAt?: Date | string
    userId: string
    recipeId: string
  }

  export type VoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutVotesNestedInput
    recipe?: RecipeUpdateOneRequiredWithoutVotesNestedInput
  }

  export type VoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    recipeId?: StringFieldUpdateOperationsInput | string
  }

  export type VoteCreateManyInput = {
    id?: string
    value: number
    createdAt?: Date | string
    userId: string
    recipeId: string
  }

  export type VoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    recipeId?: StringFieldUpdateOperationsInput | string
  }

  export type BookmarkCreateInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBookmarksInput
    recipe: RecipeCreateNestedOneWithoutBookmarksInput
  }

  export type BookmarkUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    recipeId: string
  }

  export type BookmarkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookmarksNestedInput
    recipe?: RecipeUpdateOneRequiredWithoutBookmarksNestedInput
  }

  export type BookmarkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    recipeId?: StringFieldUpdateOperationsInput | string
  }

  export type BookmarkCreateManyInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    recipeId: string
  }

  export type BookmarkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    recipeId?: StringFieldUpdateOperationsInput | string
  }

  export type TriedCreateInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTriedInput
    recipe: RecipeCreateNestedOneWithoutTriedInput
  }

  export type TriedUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    recipeId: string
  }

  export type TriedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTriedNestedInput
    recipe?: RecipeUpdateOneRequiredWithoutTriedNestedInput
  }

  export type TriedUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    recipeId?: StringFieldUpdateOperationsInput | string
  }

  export type TriedCreateManyInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    recipeId: string
  }

  export type TriedUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TriedUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    recipeId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RecipeListRelationFilter = {
    every?: RecipeWhereInput
    some?: RecipeWhereInput
    none?: RecipeWhereInput
  }

  export type VoteListRelationFilter = {
    every?: VoteWhereInput
    some?: VoteWhereInput
    none?: VoteWhereInput
  }

  export type BookmarkListRelationFilter = {
    every?: BookmarkWhereInput
    some?: BookmarkWhereInput
    none?: BookmarkWhereInput
  }

  export type TriedListRelationFilter = {
    every?: TriedWhereInput
    some?: TriedWhereInput
    none?: TriedWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RecipeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookmarkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TriedOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RecipeTagListRelationFilter = {
    every?: RecipeTagWhereInput
    some?: RecipeTagWhereInput
    none?: RecipeTagWhereInput
  }

  export type RecipeTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecipeOrderByRelevanceInput = {
    fields: RecipeOrderByRelevanceFieldEnum | RecipeOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RecipeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    instructions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
  }

  export type RecipeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    instructions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
  }

  export type RecipeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    instructions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
  }

  export type TagOrderByRelevanceInput = {
    fields: TagOrderByRelevanceFieldEnum | TagOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type RecipeScalarRelationFilter = {
    is?: RecipeWhereInput
    isNot?: RecipeWhereInput
  }

  export type TagScalarRelationFilter = {
    is?: TagWhereInput
    isNot?: TagWhereInput
  }

  export type RecipeTagOrderByRelevanceInput = {
    fields: RecipeTagOrderByRelevanceFieldEnum | RecipeTagOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RecipeTagRecipeIdTagIdCompoundUniqueInput = {
    recipeId: string
    tagId: string
  }

  export type RecipeTagCountOrderByAggregateInput = {
    recipeId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
  }

  export type RecipeTagMaxOrderByAggregateInput = {
    recipeId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
  }

  export type RecipeTagMinOrderByAggregateInput = {
    recipeId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type VoteOrderByRelevanceInput = {
    fields: VoteOrderByRelevanceFieldEnum | VoteOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type VoteUserIdRecipeIdCompoundUniqueInput = {
    userId: string
    recipeId: string
  }

  export type VoteCountOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
  }

  export type VoteAvgOrderByAggregateInput = {
    value?: SortOrder
  }

  export type VoteMaxOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
  }

  export type VoteMinOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
  }

  export type VoteSumOrderByAggregateInput = {
    value?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BookmarkOrderByRelevanceInput = {
    fields: BookmarkOrderByRelevanceFieldEnum | BookmarkOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type BookmarkUserIdRecipeIdCompoundUniqueInput = {
    userId: string
    recipeId: string
  }

  export type BookmarkCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
  }

  export type BookmarkMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
  }

  export type BookmarkMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
  }

  export type TriedOrderByRelevanceInput = {
    fields: TriedOrderByRelevanceFieldEnum | TriedOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TriedUserIdRecipeIdCompoundUniqueInput = {
    userId: string
    recipeId: string
  }

  export type TriedCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
  }

  export type TriedMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
  }

  export type TriedMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
  }

  export type RecipeCreateNestedManyWithoutAuthorInput = {
    create?: XOR<RecipeCreateWithoutAuthorInput, RecipeUncheckedCreateWithoutAuthorInput> | RecipeCreateWithoutAuthorInput[] | RecipeUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutAuthorInput | RecipeCreateOrConnectWithoutAuthorInput[]
    createMany?: RecipeCreateManyAuthorInputEnvelope
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
  }

  export type VoteCreateNestedManyWithoutUserInput = {
    create?: XOR<VoteCreateWithoutUserInput, VoteUncheckedCreateWithoutUserInput> | VoteCreateWithoutUserInput[] | VoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutUserInput | VoteCreateOrConnectWithoutUserInput[]
    createMany?: VoteCreateManyUserInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type BookmarkCreateNestedManyWithoutUserInput = {
    create?: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput> | BookmarkCreateWithoutUserInput[] | BookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutUserInput | BookmarkCreateOrConnectWithoutUserInput[]
    createMany?: BookmarkCreateManyUserInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type TriedCreateNestedManyWithoutUserInput = {
    create?: XOR<TriedCreateWithoutUserInput, TriedUncheckedCreateWithoutUserInput> | TriedCreateWithoutUserInput[] | TriedUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TriedCreateOrConnectWithoutUserInput | TriedCreateOrConnectWithoutUserInput[]
    createMany?: TriedCreateManyUserInputEnvelope
    connect?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
  }

  export type RecipeUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<RecipeCreateWithoutAuthorInput, RecipeUncheckedCreateWithoutAuthorInput> | RecipeCreateWithoutAuthorInput[] | RecipeUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutAuthorInput | RecipeCreateOrConnectWithoutAuthorInput[]
    createMany?: RecipeCreateManyAuthorInputEnvelope
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
  }

  export type VoteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<VoteCreateWithoutUserInput, VoteUncheckedCreateWithoutUserInput> | VoteCreateWithoutUserInput[] | VoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutUserInput | VoteCreateOrConnectWithoutUserInput[]
    createMany?: VoteCreateManyUserInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type BookmarkUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput> | BookmarkCreateWithoutUserInput[] | BookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutUserInput | BookmarkCreateOrConnectWithoutUserInput[]
    createMany?: BookmarkCreateManyUserInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type TriedUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TriedCreateWithoutUserInput, TriedUncheckedCreateWithoutUserInput> | TriedCreateWithoutUserInput[] | TriedUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TriedCreateOrConnectWithoutUserInput | TriedCreateOrConnectWithoutUserInput[]
    createMany?: TriedCreateManyUserInputEnvelope
    connect?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RecipeUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<RecipeCreateWithoutAuthorInput, RecipeUncheckedCreateWithoutAuthorInput> | RecipeCreateWithoutAuthorInput[] | RecipeUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutAuthorInput | RecipeCreateOrConnectWithoutAuthorInput[]
    upsert?: RecipeUpsertWithWhereUniqueWithoutAuthorInput | RecipeUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: RecipeCreateManyAuthorInputEnvelope
    set?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    disconnect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    delete?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    update?: RecipeUpdateWithWhereUniqueWithoutAuthorInput | RecipeUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: RecipeUpdateManyWithWhereWithoutAuthorInput | RecipeUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
  }

  export type VoteUpdateManyWithoutUserNestedInput = {
    create?: XOR<VoteCreateWithoutUserInput, VoteUncheckedCreateWithoutUserInput> | VoteCreateWithoutUserInput[] | VoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutUserInput | VoteCreateOrConnectWithoutUserInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutUserInput | VoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VoteCreateManyUserInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutUserInput | VoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutUserInput | VoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type BookmarkUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput> | BookmarkCreateWithoutUserInput[] | BookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutUserInput | BookmarkCreateOrConnectWithoutUserInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutUserInput | BookmarkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookmarkCreateManyUserInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutUserInput | BookmarkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutUserInput | BookmarkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type TriedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TriedCreateWithoutUserInput, TriedUncheckedCreateWithoutUserInput> | TriedCreateWithoutUserInput[] | TriedUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TriedCreateOrConnectWithoutUserInput | TriedCreateOrConnectWithoutUserInput[]
    upsert?: TriedUpsertWithWhereUniqueWithoutUserInput | TriedUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TriedCreateManyUserInputEnvelope
    set?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
    disconnect?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
    delete?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
    connect?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
    update?: TriedUpdateWithWhereUniqueWithoutUserInput | TriedUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TriedUpdateManyWithWhereWithoutUserInput | TriedUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TriedScalarWhereInput | TriedScalarWhereInput[]
  }

  export type RecipeUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<RecipeCreateWithoutAuthorInput, RecipeUncheckedCreateWithoutAuthorInput> | RecipeCreateWithoutAuthorInput[] | RecipeUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutAuthorInput | RecipeCreateOrConnectWithoutAuthorInput[]
    upsert?: RecipeUpsertWithWhereUniqueWithoutAuthorInput | RecipeUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: RecipeCreateManyAuthorInputEnvelope
    set?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    disconnect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    delete?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    update?: RecipeUpdateWithWhereUniqueWithoutAuthorInput | RecipeUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: RecipeUpdateManyWithWhereWithoutAuthorInput | RecipeUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
  }

  export type VoteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<VoteCreateWithoutUserInput, VoteUncheckedCreateWithoutUserInput> | VoteCreateWithoutUserInput[] | VoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutUserInput | VoteCreateOrConnectWithoutUserInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutUserInput | VoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VoteCreateManyUserInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutUserInput | VoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutUserInput | VoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type BookmarkUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput> | BookmarkCreateWithoutUserInput[] | BookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutUserInput | BookmarkCreateOrConnectWithoutUserInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutUserInput | BookmarkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookmarkCreateManyUserInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutUserInput | BookmarkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutUserInput | BookmarkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type TriedUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TriedCreateWithoutUserInput, TriedUncheckedCreateWithoutUserInput> | TriedCreateWithoutUserInput[] | TriedUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TriedCreateOrConnectWithoutUserInput | TriedCreateOrConnectWithoutUserInput[]
    upsert?: TriedUpsertWithWhereUniqueWithoutUserInput | TriedUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TriedCreateManyUserInputEnvelope
    set?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
    disconnect?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
    delete?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
    connect?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
    update?: TriedUpdateWithWhereUniqueWithoutUserInput | TriedUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TriedUpdateManyWithWhereWithoutUserInput | TriedUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TriedScalarWhereInput | TriedScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRecipesInput = {
    create?: XOR<UserCreateWithoutRecipesInput, UserUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecipesInput
    connect?: UserWhereUniqueInput
  }

  export type VoteCreateNestedManyWithoutRecipeInput = {
    create?: XOR<VoteCreateWithoutRecipeInput, VoteUncheckedCreateWithoutRecipeInput> | VoteCreateWithoutRecipeInput[] | VoteUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutRecipeInput | VoteCreateOrConnectWithoutRecipeInput[]
    createMany?: VoteCreateManyRecipeInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type BookmarkCreateNestedManyWithoutRecipeInput = {
    create?: XOR<BookmarkCreateWithoutRecipeInput, BookmarkUncheckedCreateWithoutRecipeInput> | BookmarkCreateWithoutRecipeInput[] | BookmarkUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutRecipeInput | BookmarkCreateOrConnectWithoutRecipeInput[]
    createMany?: BookmarkCreateManyRecipeInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type TriedCreateNestedManyWithoutRecipeInput = {
    create?: XOR<TriedCreateWithoutRecipeInput, TriedUncheckedCreateWithoutRecipeInput> | TriedCreateWithoutRecipeInput[] | TriedUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: TriedCreateOrConnectWithoutRecipeInput | TriedCreateOrConnectWithoutRecipeInput[]
    createMany?: TriedCreateManyRecipeInputEnvelope
    connect?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
  }

  export type RecipeTagCreateNestedManyWithoutRecipeInput = {
    create?: XOR<RecipeTagCreateWithoutRecipeInput, RecipeTagUncheckedCreateWithoutRecipeInput> | RecipeTagCreateWithoutRecipeInput[] | RecipeTagUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeTagCreateOrConnectWithoutRecipeInput | RecipeTagCreateOrConnectWithoutRecipeInput[]
    createMany?: RecipeTagCreateManyRecipeInputEnvelope
    connect?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
  }

  export type VoteUncheckedCreateNestedManyWithoutRecipeInput = {
    create?: XOR<VoteCreateWithoutRecipeInput, VoteUncheckedCreateWithoutRecipeInput> | VoteCreateWithoutRecipeInput[] | VoteUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutRecipeInput | VoteCreateOrConnectWithoutRecipeInput[]
    createMany?: VoteCreateManyRecipeInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type BookmarkUncheckedCreateNestedManyWithoutRecipeInput = {
    create?: XOR<BookmarkCreateWithoutRecipeInput, BookmarkUncheckedCreateWithoutRecipeInput> | BookmarkCreateWithoutRecipeInput[] | BookmarkUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutRecipeInput | BookmarkCreateOrConnectWithoutRecipeInput[]
    createMany?: BookmarkCreateManyRecipeInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type TriedUncheckedCreateNestedManyWithoutRecipeInput = {
    create?: XOR<TriedCreateWithoutRecipeInput, TriedUncheckedCreateWithoutRecipeInput> | TriedCreateWithoutRecipeInput[] | TriedUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: TriedCreateOrConnectWithoutRecipeInput | TriedCreateOrConnectWithoutRecipeInput[]
    createMany?: TriedCreateManyRecipeInputEnvelope
    connect?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
  }

  export type RecipeTagUncheckedCreateNestedManyWithoutRecipeInput = {
    create?: XOR<RecipeTagCreateWithoutRecipeInput, RecipeTagUncheckedCreateWithoutRecipeInput> | RecipeTagCreateWithoutRecipeInput[] | RecipeTagUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeTagCreateOrConnectWithoutRecipeInput | RecipeTagCreateOrConnectWithoutRecipeInput[]
    createMany?: RecipeTagCreateManyRecipeInputEnvelope
    connect?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutRecipesNestedInput = {
    create?: XOR<UserCreateWithoutRecipesInput, UserUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecipesInput
    upsert?: UserUpsertWithoutRecipesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRecipesInput, UserUpdateWithoutRecipesInput>, UserUncheckedUpdateWithoutRecipesInput>
  }

  export type VoteUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<VoteCreateWithoutRecipeInput, VoteUncheckedCreateWithoutRecipeInput> | VoteCreateWithoutRecipeInput[] | VoteUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutRecipeInput | VoteCreateOrConnectWithoutRecipeInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutRecipeInput | VoteUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: VoteCreateManyRecipeInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutRecipeInput | VoteUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutRecipeInput | VoteUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type BookmarkUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<BookmarkCreateWithoutRecipeInput, BookmarkUncheckedCreateWithoutRecipeInput> | BookmarkCreateWithoutRecipeInput[] | BookmarkUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutRecipeInput | BookmarkCreateOrConnectWithoutRecipeInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutRecipeInput | BookmarkUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: BookmarkCreateManyRecipeInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutRecipeInput | BookmarkUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutRecipeInput | BookmarkUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type TriedUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<TriedCreateWithoutRecipeInput, TriedUncheckedCreateWithoutRecipeInput> | TriedCreateWithoutRecipeInput[] | TriedUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: TriedCreateOrConnectWithoutRecipeInput | TriedCreateOrConnectWithoutRecipeInput[]
    upsert?: TriedUpsertWithWhereUniqueWithoutRecipeInput | TriedUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: TriedCreateManyRecipeInputEnvelope
    set?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
    disconnect?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
    delete?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
    connect?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
    update?: TriedUpdateWithWhereUniqueWithoutRecipeInput | TriedUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: TriedUpdateManyWithWhereWithoutRecipeInput | TriedUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: TriedScalarWhereInput | TriedScalarWhereInput[]
  }

  export type RecipeTagUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<RecipeTagCreateWithoutRecipeInput, RecipeTagUncheckedCreateWithoutRecipeInput> | RecipeTagCreateWithoutRecipeInput[] | RecipeTagUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeTagCreateOrConnectWithoutRecipeInput | RecipeTagCreateOrConnectWithoutRecipeInput[]
    upsert?: RecipeTagUpsertWithWhereUniqueWithoutRecipeInput | RecipeTagUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: RecipeTagCreateManyRecipeInputEnvelope
    set?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
    disconnect?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
    delete?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
    connect?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
    update?: RecipeTagUpdateWithWhereUniqueWithoutRecipeInput | RecipeTagUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: RecipeTagUpdateManyWithWhereWithoutRecipeInput | RecipeTagUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: RecipeTagScalarWhereInput | RecipeTagScalarWhereInput[]
  }

  export type VoteUncheckedUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<VoteCreateWithoutRecipeInput, VoteUncheckedCreateWithoutRecipeInput> | VoteCreateWithoutRecipeInput[] | VoteUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutRecipeInput | VoteCreateOrConnectWithoutRecipeInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutRecipeInput | VoteUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: VoteCreateManyRecipeInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutRecipeInput | VoteUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutRecipeInput | VoteUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type BookmarkUncheckedUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<BookmarkCreateWithoutRecipeInput, BookmarkUncheckedCreateWithoutRecipeInput> | BookmarkCreateWithoutRecipeInput[] | BookmarkUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutRecipeInput | BookmarkCreateOrConnectWithoutRecipeInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutRecipeInput | BookmarkUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: BookmarkCreateManyRecipeInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutRecipeInput | BookmarkUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutRecipeInput | BookmarkUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type TriedUncheckedUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<TriedCreateWithoutRecipeInput, TriedUncheckedCreateWithoutRecipeInput> | TriedCreateWithoutRecipeInput[] | TriedUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: TriedCreateOrConnectWithoutRecipeInput | TriedCreateOrConnectWithoutRecipeInput[]
    upsert?: TriedUpsertWithWhereUniqueWithoutRecipeInput | TriedUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: TriedCreateManyRecipeInputEnvelope
    set?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
    disconnect?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
    delete?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
    connect?: TriedWhereUniqueInput | TriedWhereUniqueInput[]
    update?: TriedUpdateWithWhereUniqueWithoutRecipeInput | TriedUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: TriedUpdateManyWithWhereWithoutRecipeInput | TriedUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: TriedScalarWhereInput | TriedScalarWhereInput[]
  }

  export type RecipeTagUncheckedUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<RecipeTagCreateWithoutRecipeInput, RecipeTagUncheckedCreateWithoutRecipeInput> | RecipeTagCreateWithoutRecipeInput[] | RecipeTagUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeTagCreateOrConnectWithoutRecipeInput | RecipeTagCreateOrConnectWithoutRecipeInput[]
    upsert?: RecipeTagUpsertWithWhereUniqueWithoutRecipeInput | RecipeTagUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: RecipeTagCreateManyRecipeInputEnvelope
    set?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
    disconnect?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
    delete?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
    connect?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
    update?: RecipeTagUpdateWithWhereUniqueWithoutRecipeInput | RecipeTagUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: RecipeTagUpdateManyWithWhereWithoutRecipeInput | RecipeTagUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: RecipeTagScalarWhereInput | RecipeTagScalarWhereInput[]
  }

  export type RecipeTagCreateNestedManyWithoutTagInput = {
    create?: XOR<RecipeTagCreateWithoutTagInput, RecipeTagUncheckedCreateWithoutTagInput> | RecipeTagCreateWithoutTagInput[] | RecipeTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: RecipeTagCreateOrConnectWithoutTagInput | RecipeTagCreateOrConnectWithoutTagInput[]
    createMany?: RecipeTagCreateManyTagInputEnvelope
    connect?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
  }

  export type RecipeTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<RecipeTagCreateWithoutTagInput, RecipeTagUncheckedCreateWithoutTagInput> | RecipeTagCreateWithoutTagInput[] | RecipeTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: RecipeTagCreateOrConnectWithoutTagInput | RecipeTagCreateOrConnectWithoutTagInput[]
    createMany?: RecipeTagCreateManyTagInputEnvelope
    connect?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
  }

  export type RecipeTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<RecipeTagCreateWithoutTagInput, RecipeTagUncheckedCreateWithoutTagInput> | RecipeTagCreateWithoutTagInput[] | RecipeTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: RecipeTagCreateOrConnectWithoutTagInput | RecipeTagCreateOrConnectWithoutTagInput[]
    upsert?: RecipeTagUpsertWithWhereUniqueWithoutTagInput | RecipeTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: RecipeTagCreateManyTagInputEnvelope
    set?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
    disconnect?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
    delete?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
    connect?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
    update?: RecipeTagUpdateWithWhereUniqueWithoutTagInput | RecipeTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: RecipeTagUpdateManyWithWhereWithoutTagInput | RecipeTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: RecipeTagScalarWhereInput | RecipeTagScalarWhereInput[]
  }

  export type RecipeTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<RecipeTagCreateWithoutTagInput, RecipeTagUncheckedCreateWithoutTagInput> | RecipeTagCreateWithoutTagInput[] | RecipeTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: RecipeTagCreateOrConnectWithoutTagInput | RecipeTagCreateOrConnectWithoutTagInput[]
    upsert?: RecipeTagUpsertWithWhereUniqueWithoutTagInput | RecipeTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: RecipeTagCreateManyTagInputEnvelope
    set?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
    disconnect?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
    delete?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
    connect?: RecipeTagWhereUniqueInput | RecipeTagWhereUniqueInput[]
    update?: RecipeTagUpdateWithWhereUniqueWithoutTagInput | RecipeTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: RecipeTagUpdateManyWithWhereWithoutTagInput | RecipeTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: RecipeTagScalarWhereInput | RecipeTagScalarWhereInput[]
  }

  export type RecipeCreateNestedOneWithoutTagsInput = {
    create?: XOR<RecipeCreateWithoutTagsInput, RecipeUncheckedCreateWithoutTagsInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutTagsInput
    connect?: RecipeWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutRecipesInput = {
    create?: XOR<TagCreateWithoutRecipesInput, TagUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: TagCreateOrConnectWithoutRecipesInput
    connect?: TagWhereUniqueInput
  }

  export type RecipeUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<RecipeCreateWithoutTagsInput, RecipeUncheckedCreateWithoutTagsInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutTagsInput
    upsert?: RecipeUpsertWithoutTagsInput
    connect?: RecipeWhereUniqueInput
    update?: XOR<XOR<RecipeUpdateToOneWithWhereWithoutTagsInput, RecipeUpdateWithoutTagsInput>, RecipeUncheckedUpdateWithoutTagsInput>
  }

  export type TagUpdateOneRequiredWithoutRecipesNestedInput = {
    create?: XOR<TagCreateWithoutRecipesInput, TagUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: TagCreateOrConnectWithoutRecipesInput
    upsert?: TagUpsertWithoutRecipesInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutRecipesInput, TagUpdateWithoutRecipesInput>, TagUncheckedUpdateWithoutRecipesInput>
  }

  export type UserCreateNestedOneWithoutVotesInput = {
    create?: XOR<UserCreateWithoutVotesInput, UserUncheckedCreateWithoutVotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutVotesInput
    connect?: UserWhereUniqueInput
  }

  export type RecipeCreateNestedOneWithoutVotesInput = {
    create?: XOR<RecipeCreateWithoutVotesInput, RecipeUncheckedCreateWithoutVotesInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutVotesInput
    connect?: RecipeWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<UserCreateWithoutVotesInput, UserUncheckedCreateWithoutVotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutVotesInput
    upsert?: UserUpsertWithoutVotesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVotesInput, UserUpdateWithoutVotesInput>, UserUncheckedUpdateWithoutVotesInput>
  }

  export type RecipeUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<RecipeCreateWithoutVotesInput, RecipeUncheckedCreateWithoutVotesInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutVotesInput
    upsert?: RecipeUpsertWithoutVotesInput
    connect?: RecipeWhereUniqueInput
    update?: XOR<XOR<RecipeUpdateToOneWithWhereWithoutVotesInput, RecipeUpdateWithoutVotesInput>, RecipeUncheckedUpdateWithoutVotesInput>
  }

  export type UserCreateNestedOneWithoutBookmarksInput = {
    create?: XOR<UserCreateWithoutBookmarksInput, UserUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookmarksInput
    connect?: UserWhereUniqueInput
  }

  export type RecipeCreateNestedOneWithoutBookmarksInput = {
    create?: XOR<RecipeCreateWithoutBookmarksInput, RecipeUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutBookmarksInput
    connect?: RecipeWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBookmarksNestedInput = {
    create?: XOR<UserCreateWithoutBookmarksInput, UserUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookmarksInput
    upsert?: UserUpsertWithoutBookmarksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBookmarksInput, UserUpdateWithoutBookmarksInput>, UserUncheckedUpdateWithoutBookmarksInput>
  }

  export type RecipeUpdateOneRequiredWithoutBookmarksNestedInput = {
    create?: XOR<RecipeCreateWithoutBookmarksInput, RecipeUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutBookmarksInput
    upsert?: RecipeUpsertWithoutBookmarksInput
    connect?: RecipeWhereUniqueInput
    update?: XOR<XOR<RecipeUpdateToOneWithWhereWithoutBookmarksInput, RecipeUpdateWithoutBookmarksInput>, RecipeUncheckedUpdateWithoutBookmarksInput>
  }

  export type UserCreateNestedOneWithoutTriedInput = {
    create?: XOR<UserCreateWithoutTriedInput, UserUncheckedCreateWithoutTriedInput>
    connectOrCreate?: UserCreateOrConnectWithoutTriedInput
    connect?: UserWhereUniqueInput
  }

  export type RecipeCreateNestedOneWithoutTriedInput = {
    create?: XOR<RecipeCreateWithoutTriedInput, RecipeUncheckedCreateWithoutTriedInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutTriedInput
    connect?: RecipeWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTriedNestedInput = {
    create?: XOR<UserCreateWithoutTriedInput, UserUncheckedCreateWithoutTriedInput>
    connectOrCreate?: UserCreateOrConnectWithoutTriedInput
    upsert?: UserUpsertWithoutTriedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTriedInput, UserUpdateWithoutTriedInput>, UserUncheckedUpdateWithoutTriedInput>
  }

  export type RecipeUpdateOneRequiredWithoutTriedNestedInput = {
    create?: XOR<RecipeCreateWithoutTriedInput, RecipeUncheckedCreateWithoutTriedInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutTriedInput
    upsert?: RecipeUpsertWithoutTriedInput
    connect?: RecipeWhereUniqueInput
    update?: XOR<XOR<RecipeUpdateToOneWithWhereWithoutTriedInput, RecipeUpdateWithoutTriedInput>, RecipeUncheckedUpdateWithoutTriedInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type RecipeCreateWithoutAuthorInput = {
    id?: string
    name: string
    description: string
    instructions: string
    createdAt?: Date | string
    updatedAt?: Date | string
    votes?: VoteCreateNestedManyWithoutRecipeInput
    bookmarks?: BookmarkCreateNestedManyWithoutRecipeInput
    tried?: TriedCreateNestedManyWithoutRecipeInput
    tags?: RecipeTagCreateNestedManyWithoutRecipeInput
  }

  export type RecipeUncheckedCreateWithoutAuthorInput = {
    id?: string
    name: string
    description: string
    instructions: string
    createdAt?: Date | string
    updatedAt?: Date | string
    votes?: VoteUncheckedCreateNestedManyWithoutRecipeInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutRecipeInput
    tried?: TriedUncheckedCreateNestedManyWithoutRecipeInput
    tags?: RecipeTagUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type RecipeCreateOrConnectWithoutAuthorInput = {
    where: RecipeWhereUniqueInput
    create: XOR<RecipeCreateWithoutAuthorInput, RecipeUncheckedCreateWithoutAuthorInput>
  }

  export type RecipeCreateManyAuthorInputEnvelope = {
    data: RecipeCreateManyAuthorInput | RecipeCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type VoteCreateWithoutUserInput = {
    id?: string
    value: number
    createdAt?: Date | string
    recipe: RecipeCreateNestedOneWithoutVotesInput
  }

  export type VoteUncheckedCreateWithoutUserInput = {
    id?: string
    value: number
    createdAt?: Date | string
    recipeId: string
  }

  export type VoteCreateOrConnectWithoutUserInput = {
    where: VoteWhereUniqueInput
    create: XOR<VoteCreateWithoutUserInput, VoteUncheckedCreateWithoutUserInput>
  }

  export type VoteCreateManyUserInputEnvelope = {
    data: VoteCreateManyUserInput | VoteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BookmarkCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    recipe: RecipeCreateNestedOneWithoutBookmarksInput
  }

  export type BookmarkUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    recipeId: string
  }

  export type BookmarkCreateOrConnectWithoutUserInput = {
    where: BookmarkWhereUniqueInput
    create: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput>
  }

  export type BookmarkCreateManyUserInputEnvelope = {
    data: BookmarkCreateManyUserInput | BookmarkCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TriedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    recipe: RecipeCreateNestedOneWithoutTriedInput
  }

  export type TriedUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    recipeId: string
  }

  export type TriedCreateOrConnectWithoutUserInput = {
    where: TriedWhereUniqueInput
    create: XOR<TriedCreateWithoutUserInput, TriedUncheckedCreateWithoutUserInput>
  }

  export type TriedCreateManyUserInputEnvelope = {
    data: TriedCreateManyUserInput | TriedCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RecipeUpsertWithWhereUniqueWithoutAuthorInput = {
    where: RecipeWhereUniqueInput
    update: XOR<RecipeUpdateWithoutAuthorInput, RecipeUncheckedUpdateWithoutAuthorInput>
    create: XOR<RecipeCreateWithoutAuthorInput, RecipeUncheckedCreateWithoutAuthorInput>
  }

  export type RecipeUpdateWithWhereUniqueWithoutAuthorInput = {
    where: RecipeWhereUniqueInput
    data: XOR<RecipeUpdateWithoutAuthorInput, RecipeUncheckedUpdateWithoutAuthorInput>
  }

  export type RecipeUpdateManyWithWhereWithoutAuthorInput = {
    where: RecipeScalarWhereInput
    data: XOR<RecipeUpdateManyMutationInput, RecipeUncheckedUpdateManyWithoutAuthorInput>
  }

  export type RecipeScalarWhereInput = {
    AND?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
    OR?: RecipeScalarWhereInput[]
    NOT?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
    id?: StringFilter<"Recipe"> | string
    name?: StringFilter<"Recipe"> | string
    description?: StringFilter<"Recipe"> | string
    instructions?: StringFilter<"Recipe"> | string
    createdAt?: DateTimeFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeFilter<"Recipe"> | Date | string
    authorId?: StringFilter<"Recipe"> | string
  }

  export type VoteUpsertWithWhereUniqueWithoutUserInput = {
    where: VoteWhereUniqueInput
    update: XOR<VoteUpdateWithoutUserInput, VoteUncheckedUpdateWithoutUserInput>
    create: XOR<VoteCreateWithoutUserInput, VoteUncheckedCreateWithoutUserInput>
  }

  export type VoteUpdateWithWhereUniqueWithoutUserInput = {
    where: VoteWhereUniqueInput
    data: XOR<VoteUpdateWithoutUserInput, VoteUncheckedUpdateWithoutUserInput>
  }

  export type VoteUpdateManyWithWhereWithoutUserInput = {
    where: VoteScalarWhereInput
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyWithoutUserInput>
  }

  export type VoteScalarWhereInput = {
    AND?: VoteScalarWhereInput | VoteScalarWhereInput[]
    OR?: VoteScalarWhereInput[]
    NOT?: VoteScalarWhereInput | VoteScalarWhereInput[]
    id?: StringFilter<"Vote"> | string
    value?: IntFilter<"Vote"> | number
    createdAt?: DateTimeFilter<"Vote"> | Date | string
    userId?: StringFilter<"Vote"> | string
    recipeId?: StringFilter<"Vote"> | string
  }

  export type BookmarkUpsertWithWhereUniqueWithoutUserInput = {
    where: BookmarkWhereUniqueInput
    update: XOR<BookmarkUpdateWithoutUserInput, BookmarkUncheckedUpdateWithoutUserInput>
    create: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput>
  }

  export type BookmarkUpdateWithWhereUniqueWithoutUserInput = {
    where: BookmarkWhereUniqueInput
    data: XOR<BookmarkUpdateWithoutUserInput, BookmarkUncheckedUpdateWithoutUserInput>
  }

  export type BookmarkUpdateManyWithWhereWithoutUserInput = {
    where: BookmarkScalarWhereInput
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyWithoutUserInput>
  }

  export type BookmarkScalarWhereInput = {
    AND?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
    OR?: BookmarkScalarWhereInput[]
    NOT?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
    id?: StringFilter<"Bookmark"> | string
    createdAt?: DateTimeFilter<"Bookmark"> | Date | string
    userId?: StringFilter<"Bookmark"> | string
    recipeId?: StringFilter<"Bookmark"> | string
  }

  export type TriedUpsertWithWhereUniqueWithoutUserInput = {
    where: TriedWhereUniqueInput
    update: XOR<TriedUpdateWithoutUserInput, TriedUncheckedUpdateWithoutUserInput>
    create: XOR<TriedCreateWithoutUserInput, TriedUncheckedCreateWithoutUserInput>
  }

  export type TriedUpdateWithWhereUniqueWithoutUserInput = {
    where: TriedWhereUniqueInput
    data: XOR<TriedUpdateWithoutUserInput, TriedUncheckedUpdateWithoutUserInput>
  }

  export type TriedUpdateManyWithWhereWithoutUserInput = {
    where: TriedScalarWhereInput
    data: XOR<TriedUpdateManyMutationInput, TriedUncheckedUpdateManyWithoutUserInput>
  }

  export type TriedScalarWhereInput = {
    AND?: TriedScalarWhereInput | TriedScalarWhereInput[]
    OR?: TriedScalarWhereInput[]
    NOT?: TriedScalarWhereInput | TriedScalarWhereInput[]
    id?: StringFilter<"Tried"> | string
    createdAt?: DateTimeFilter<"Tried"> | Date | string
    userId?: StringFilter<"Tried"> | string
    recipeId?: StringFilter<"Tried"> | string
  }

  export type UserCreateWithoutRecipesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    votes?: VoteCreateNestedManyWithoutUserInput
    bookmarks?: BookmarkCreateNestedManyWithoutUserInput
    tried?: TriedCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRecipesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    votes?: VoteUncheckedCreateNestedManyWithoutUserInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutUserInput
    tried?: TriedUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRecipesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRecipesInput, UserUncheckedCreateWithoutRecipesInput>
  }

  export type VoteCreateWithoutRecipeInput = {
    id?: string
    value: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutVotesInput
  }

  export type VoteUncheckedCreateWithoutRecipeInput = {
    id?: string
    value: number
    createdAt?: Date | string
    userId: string
  }

  export type VoteCreateOrConnectWithoutRecipeInput = {
    where: VoteWhereUniqueInput
    create: XOR<VoteCreateWithoutRecipeInput, VoteUncheckedCreateWithoutRecipeInput>
  }

  export type VoteCreateManyRecipeInputEnvelope = {
    data: VoteCreateManyRecipeInput | VoteCreateManyRecipeInput[]
    skipDuplicates?: boolean
  }

  export type BookmarkCreateWithoutRecipeInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBookmarksInput
  }

  export type BookmarkUncheckedCreateWithoutRecipeInput = {
    id?: string
    createdAt?: Date | string
    userId: string
  }

  export type BookmarkCreateOrConnectWithoutRecipeInput = {
    where: BookmarkWhereUniqueInput
    create: XOR<BookmarkCreateWithoutRecipeInput, BookmarkUncheckedCreateWithoutRecipeInput>
  }

  export type BookmarkCreateManyRecipeInputEnvelope = {
    data: BookmarkCreateManyRecipeInput | BookmarkCreateManyRecipeInput[]
    skipDuplicates?: boolean
  }

  export type TriedCreateWithoutRecipeInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTriedInput
  }

  export type TriedUncheckedCreateWithoutRecipeInput = {
    id?: string
    createdAt?: Date | string
    userId: string
  }

  export type TriedCreateOrConnectWithoutRecipeInput = {
    where: TriedWhereUniqueInput
    create: XOR<TriedCreateWithoutRecipeInput, TriedUncheckedCreateWithoutRecipeInput>
  }

  export type TriedCreateManyRecipeInputEnvelope = {
    data: TriedCreateManyRecipeInput | TriedCreateManyRecipeInput[]
    skipDuplicates?: boolean
  }

  export type RecipeTagCreateWithoutRecipeInput = {
    createdAt?: Date | string
    tag: TagCreateNestedOneWithoutRecipesInput
  }

  export type RecipeTagUncheckedCreateWithoutRecipeInput = {
    tagId: string
    createdAt?: Date | string
  }

  export type RecipeTagCreateOrConnectWithoutRecipeInput = {
    where: RecipeTagWhereUniqueInput
    create: XOR<RecipeTagCreateWithoutRecipeInput, RecipeTagUncheckedCreateWithoutRecipeInput>
  }

  export type RecipeTagCreateManyRecipeInputEnvelope = {
    data: RecipeTagCreateManyRecipeInput | RecipeTagCreateManyRecipeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutRecipesInput = {
    update: XOR<UserUpdateWithoutRecipesInput, UserUncheckedUpdateWithoutRecipesInput>
    create: XOR<UserCreateWithoutRecipesInput, UserUncheckedCreateWithoutRecipesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRecipesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRecipesInput, UserUncheckedUpdateWithoutRecipesInput>
  }

  export type UserUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votes?: VoteUpdateManyWithoutUserNestedInput
    bookmarks?: BookmarkUpdateManyWithoutUserNestedInput
    tried?: TriedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votes?: VoteUncheckedUpdateManyWithoutUserNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutUserNestedInput
    tried?: TriedUncheckedUpdateManyWithoutUserNestedInput
  }

  export type VoteUpsertWithWhereUniqueWithoutRecipeInput = {
    where: VoteWhereUniqueInput
    update: XOR<VoteUpdateWithoutRecipeInput, VoteUncheckedUpdateWithoutRecipeInput>
    create: XOR<VoteCreateWithoutRecipeInput, VoteUncheckedCreateWithoutRecipeInput>
  }

  export type VoteUpdateWithWhereUniqueWithoutRecipeInput = {
    where: VoteWhereUniqueInput
    data: XOR<VoteUpdateWithoutRecipeInput, VoteUncheckedUpdateWithoutRecipeInput>
  }

  export type VoteUpdateManyWithWhereWithoutRecipeInput = {
    where: VoteScalarWhereInput
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyWithoutRecipeInput>
  }

  export type BookmarkUpsertWithWhereUniqueWithoutRecipeInput = {
    where: BookmarkWhereUniqueInput
    update: XOR<BookmarkUpdateWithoutRecipeInput, BookmarkUncheckedUpdateWithoutRecipeInput>
    create: XOR<BookmarkCreateWithoutRecipeInput, BookmarkUncheckedCreateWithoutRecipeInput>
  }

  export type BookmarkUpdateWithWhereUniqueWithoutRecipeInput = {
    where: BookmarkWhereUniqueInput
    data: XOR<BookmarkUpdateWithoutRecipeInput, BookmarkUncheckedUpdateWithoutRecipeInput>
  }

  export type BookmarkUpdateManyWithWhereWithoutRecipeInput = {
    where: BookmarkScalarWhereInput
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyWithoutRecipeInput>
  }

  export type TriedUpsertWithWhereUniqueWithoutRecipeInput = {
    where: TriedWhereUniqueInput
    update: XOR<TriedUpdateWithoutRecipeInput, TriedUncheckedUpdateWithoutRecipeInput>
    create: XOR<TriedCreateWithoutRecipeInput, TriedUncheckedCreateWithoutRecipeInput>
  }

  export type TriedUpdateWithWhereUniqueWithoutRecipeInput = {
    where: TriedWhereUniqueInput
    data: XOR<TriedUpdateWithoutRecipeInput, TriedUncheckedUpdateWithoutRecipeInput>
  }

  export type TriedUpdateManyWithWhereWithoutRecipeInput = {
    where: TriedScalarWhereInput
    data: XOR<TriedUpdateManyMutationInput, TriedUncheckedUpdateManyWithoutRecipeInput>
  }

  export type RecipeTagUpsertWithWhereUniqueWithoutRecipeInput = {
    where: RecipeTagWhereUniqueInput
    update: XOR<RecipeTagUpdateWithoutRecipeInput, RecipeTagUncheckedUpdateWithoutRecipeInput>
    create: XOR<RecipeTagCreateWithoutRecipeInput, RecipeTagUncheckedCreateWithoutRecipeInput>
  }

  export type RecipeTagUpdateWithWhereUniqueWithoutRecipeInput = {
    where: RecipeTagWhereUniqueInput
    data: XOR<RecipeTagUpdateWithoutRecipeInput, RecipeTagUncheckedUpdateWithoutRecipeInput>
  }

  export type RecipeTagUpdateManyWithWhereWithoutRecipeInput = {
    where: RecipeTagScalarWhereInput
    data: XOR<RecipeTagUpdateManyMutationInput, RecipeTagUncheckedUpdateManyWithoutRecipeInput>
  }

  export type RecipeTagScalarWhereInput = {
    AND?: RecipeTagScalarWhereInput | RecipeTagScalarWhereInput[]
    OR?: RecipeTagScalarWhereInput[]
    NOT?: RecipeTagScalarWhereInput | RecipeTagScalarWhereInput[]
    recipeId?: StringFilter<"RecipeTag"> | string
    tagId?: StringFilter<"RecipeTag"> | string
    createdAt?: DateTimeFilter<"RecipeTag"> | Date | string
  }

  export type RecipeTagCreateWithoutTagInput = {
    createdAt?: Date | string
    recipe: RecipeCreateNestedOneWithoutTagsInput
  }

  export type RecipeTagUncheckedCreateWithoutTagInput = {
    recipeId: string
    createdAt?: Date | string
  }

  export type RecipeTagCreateOrConnectWithoutTagInput = {
    where: RecipeTagWhereUniqueInput
    create: XOR<RecipeTagCreateWithoutTagInput, RecipeTagUncheckedCreateWithoutTagInput>
  }

  export type RecipeTagCreateManyTagInputEnvelope = {
    data: RecipeTagCreateManyTagInput | RecipeTagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type RecipeTagUpsertWithWhereUniqueWithoutTagInput = {
    where: RecipeTagWhereUniqueInput
    update: XOR<RecipeTagUpdateWithoutTagInput, RecipeTagUncheckedUpdateWithoutTagInput>
    create: XOR<RecipeTagCreateWithoutTagInput, RecipeTagUncheckedCreateWithoutTagInput>
  }

  export type RecipeTagUpdateWithWhereUniqueWithoutTagInput = {
    where: RecipeTagWhereUniqueInput
    data: XOR<RecipeTagUpdateWithoutTagInput, RecipeTagUncheckedUpdateWithoutTagInput>
  }

  export type RecipeTagUpdateManyWithWhereWithoutTagInput = {
    where: RecipeTagScalarWhereInput
    data: XOR<RecipeTagUpdateManyMutationInput, RecipeTagUncheckedUpdateManyWithoutTagInput>
  }

  export type RecipeCreateWithoutTagsInput = {
    id?: string
    name: string
    description: string
    instructions: string
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutRecipesInput
    votes?: VoteCreateNestedManyWithoutRecipeInput
    bookmarks?: BookmarkCreateNestedManyWithoutRecipeInput
    tried?: TriedCreateNestedManyWithoutRecipeInput
  }

  export type RecipeUncheckedCreateWithoutTagsInput = {
    id?: string
    name: string
    description: string
    instructions: string
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    votes?: VoteUncheckedCreateNestedManyWithoutRecipeInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutRecipeInput
    tried?: TriedUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type RecipeCreateOrConnectWithoutTagsInput = {
    where: RecipeWhereUniqueInput
    create: XOR<RecipeCreateWithoutTagsInput, RecipeUncheckedCreateWithoutTagsInput>
  }

  export type TagCreateWithoutRecipesInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type TagUncheckedCreateWithoutRecipesInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type TagCreateOrConnectWithoutRecipesInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutRecipesInput, TagUncheckedCreateWithoutRecipesInput>
  }

  export type RecipeUpsertWithoutTagsInput = {
    update: XOR<RecipeUpdateWithoutTagsInput, RecipeUncheckedUpdateWithoutTagsInput>
    create: XOR<RecipeCreateWithoutTagsInput, RecipeUncheckedCreateWithoutTagsInput>
    where?: RecipeWhereInput
  }

  export type RecipeUpdateToOneWithWhereWithoutTagsInput = {
    where?: RecipeWhereInput
    data: XOR<RecipeUpdateWithoutTagsInput, RecipeUncheckedUpdateWithoutTagsInput>
  }

  export type RecipeUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutRecipesNestedInput
    votes?: VoteUpdateManyWithoutRecipeNestedInput
    bookmarks?: BookmarkUpdateManyWithoutRecipeNestedInput
    tried?: TriedUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    votes?: VoteUncheckedUpdateManyWithoutRecipeNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutRecipeNestedInput
    tried?: TriedUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type TagUpsertWithoutRecipesInput = {
    update: XOR<TagUpdateWithoutRecipesInput, TagUncheckedUpdateWithoutRecipesInput>
    create: XOR<TagCreateWithoutRecipesInput, TagUncheckedCreateWithoutRecipesInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutRecipesInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutRecipesInput, TagUncheckedUpdateWithoutRecipesInput>
  }

  export type TagUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUncheckedUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutVotesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recipes?: RecipeCreateNestedManyWithoutAuthorInput
    bookmarks?: BookmarkCreateNestedManyWithoutUserInput
    tried?: TriedCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVotesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recipes?: RecipeUncheckedCreateNestedManyWithoutAuthorInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutUserInput
    tried?: TriedUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVotesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVotesInput, UserUncheckedCreateWithoutVotesInput>
  }

  export type RecipeCreateWithoutVotesInput = {
    id?: string
    name: string
    description: string
    instructions: string
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutRecipesInput
    bookmarks?: BookmarkCreateNestedManyWithoutRecipeInput
    tried?: TriedCreateNestedManyWithoutRecipeInput
    tags?: RecipeTagCreateNestedManyWithoutRecipeInput
  }

  export type RecipeUncheckedCreateWithoutVotesInput = {
    id?: string
    name: string
    description: string
    instructions: string
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutRecipeInput
    tried?: TriedUncheckedCreateNestedManyWithoutRecipeInput
    tags?: RecipeTagUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type RecipeCreateOrConnectWithoutVotesInput = {
    where: RecipeWhereUniqueInput
    create: XOR<RecipeCreateWithoutVotesInput, RecipeUncheckedCreateWithoutVotesInput>
  }

  export type UserUpsertWithoutVotesInput = {
    update: XOR<UserUpdateWithoutVotesInput, UserUncheckedUpdateWithoutVotesInput>
    create: XOR<UserCreateWithoutVotesInput, UserUncheckedCreateWithoutVotesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVotesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVotesInput, UserUncheckedUpdateWithoutVotesInput>
  }

  export type UserUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: RecipeUpdateManyWithoutAuthorNestedInput
    bookmarks?: BookmarkUpdateManyWithoutUserNestedInput
    tried?: TriedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: RecipeUncheckedUpdateManyWithoutAuthorNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutUserNestedInput
    tried?: TriedUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RecipeUpsertWithoutVotesInput = {
    update: XOR<RecipeUpdateWithoutVotesInput, RecipeUncheckedUpdateWithoutVotesInput>
    create: XOR<RecipeCreateWithoutVotesInput, RecipeUncheckedCreateWithoutVotesInput>
    where?: RecipeWhereInput
  }

  export type RecipeUpdateToOneWithWhereWithoutVotesInput = {
    where?: RecipeWhereInput
    data: XOR<RecipeUpdateWithoutVotesInput, RecipeUncheckedUpdateWithoutVotesInput>
  }

  export type RecipeUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutRecipesNestedInput
    bookmarks?: BookmarkUpdateManyWithoutRecipeNestedInput
    tried?: TriedUpdateManyWithoutRecipeNestedInput
    tags?: RecipeTagUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeUncheckedUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    bookmarks?: BookmarkUncheckedUpdateManyWithoutRecipeNestedInput
    tried?: TriedUncheckedUpdateManyWithoutRecipeNestedInput
    tags?: RecipeTagUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type UserCreateWithoutBookmarksInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recipes?: RecipeCreateNestedManyWithoutAuthorInput
    votes?: VoteCreateNestedManyWithoutUserInput
    tried?: TriedCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBookmarksInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recipes?: RecipeUncheckedCreateNestedManyWithoutAuthorInput
    votes?: VoteUncheckedCreateNestedManyWithoutUserInput
    tried?: TriedUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBookmarksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookmarksInput, UserUncheckedCreateWithoutBookmarksInput>
  }

  export type RecipeCreateWithoutBookmarksInput = {
    id?: string
    name: string
    description: string
    instructions: string
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutRecipesInput
    votes?: VoteCreateNestedManyWithoutRecipeInput
    tried?: TriedCreateNestedManyWithoutRecipeInput
    tags?: RecipeTagCreateNestedManyWithoutRecipeInput
  }

  export type RecipeUncheckedCreateWithoutBookmarksInput = {
    id?: string
    name: string
    description: string
    instructions: string
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    votes?: VoteUncheckedCreateNestedManyWithoutRecipeInput
    tried?: TriedUncheckedCreateNestedManyWithoutRecipeInput
    tags?: RecipeTagUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type RecipeCreateOrConnectWithoutBookmarksInput = {
    where: RecipeWhereUniqueInput
    create: XOR<RecipeCreateWithoutBookmarksInput, RecipeUncheckedCreateWithoutBookmarksInput>
  }

  export type UserUpsertWithoutBookmarksInput = {
    update: XOR<UserUpdateWithoutBookmarksInput, UserUncheckedUpdateWithoutBookmarksInput>
    create: XOR<UserCreateWithoutBookmarksInput, UserUncheckedCreateWithoutBookmarksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBookmarksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBookmarksInput, UserUncheckedUpdateWithoutBookmarksInput>
  }

  export type UserUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: RecipeUpdateManyWithoutAuthorNestedInput
    votes?: VoteUpdateManyWithoutUserNestedInput
    tried?: TriedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: RecipeUncheckedUpdateManyWithoutAuthorNestedInput
    votes?: VoteUncheckedUpdateManyWithoutUserNestedInput
    tried?: TriedUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RecipeUpsertWithoutBookmarksInput = {
    update: XOR<RecipeUpdateWithoutBookmarksInput, RecipeUncheckedUpdateWithoutBookmarksInput>
    create: XOR<RecipeCreateWithoutBookmarksInput, RecipeUncheckedCreateWithoutBookmarksInput>
    where?: RecipeWhereInput
  }

  export type RecipeUpdateToOneWithWhereWithoutBookmarksInput = {
    where?: RecipeWhereInput
    data: XOR<RecipeUpdateWithoutBookmarksInput, RecipeUncheckedUpdateWithoutBookmarksInput>
  }

  export type RecipeUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutRecipesNestedInput
    votes?: VoteUpdateManyWithoutRecipeNestedInput
    tried?: TriedUpdateManyWithoutRecipeNestedInput
    tags?: RecipeTagUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeUncheckedUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    votes?: VoteUncheckedUpdateManyWithoutRecipeNestedInput
    tried?: TriedUncheckedUpdateManyWithoutRecipeNestedInput
    tags?: RecipeTagUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type UserCreateWithoutTriedInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recipes?: RecipeCreateNestedManyWithoutAuthorInput
    votes?: VoteCreateNestedManyWithoutUserInput
    bookmarks?: BookmarkCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTriedInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recipes?: RecipeUncheckedCreateNestedManyWithoutAuthorInput
    votes?: VoteUncheckedCreateNestedManyWithoutUserInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTriedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTriedInput, UserUncheckedCreateWithoutTriedInput>
  }

  export type RecipeCreateWithoutTriedInput = {
    id?: string
    name: string
    description: string
    instructions: string
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutRecipesInput
    votes?: VoteCreateNestedManyWithoutRecipeInput
    bookmarks?: BookmarkCreateNestedManyWithoutRecipeInput
    tags?: RecipeTagCreateNestedManyWithoutRecipeInput
  }

  export type RecipeUncheckedCreateWithoutTriedInput = {
    id?: string
    name: string
    description: string
    instructions: string
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    votes?: VoteUncheckedCreateNestedManyWithoutRecipeInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutRecipeInput
    tags?: RecipeTagUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type RecipeCreateOrConnectWithoutTriedInput = {
    where: RecipeWhereUniqueInput
    create: XOR<RecipeCreateWithoutTriedInput, RecipeUncheckedCreateWithoutTriedInput>
  }

  export type UserUpsertWithoutTriedInput = {
    update: XOR<UserUpdateWithoutTriedInput, UserUncheckedUpdateWithoutTriedInput>
    create: XOR<UserCreateWithoutTriedInput, UserUncheckedCreateWithoutTriedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTriedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTriedInput, UserUncheckedUpdateWithoutTriedInput>
  }

  export type UserUpdateWithoutTriedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: RecipeUpdateManyWithoutAuthorNestedInput
    votes?: VoteUpdateManyWithoutUserNestedInput
    bookmarks?: BookmarkUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTriedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: RecipeUncheckedUpdateManyWithoutAuthorNestedInput
    votes?: VoteUncheckedUpdateManyWithoutUserNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RecipeUpsertWithoutTriedInput = {
    update: XOR<RecipeUpdateWithoutTriedInput, RecipeUncheckedUpdateWithoutTriedInput>
    create: XOR<RecipeCreateWithoutTriedInput, RecipeUncheckedCreateWithoutTriedInput>
    where?: RecipeWhereInput
  }

  export type RecipeUpdateToOneWithWhereWithoutTriedInput = {
    where?: RecipeWhereInput
    data: XOR<RecipeUpdateWithoutTriedInput, RecipeUncheckedUpdateWithoutTriedInput>
  }

  export type RecipeUpdateWithoutTriedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutRecipesNestedInput
    votes?: VoteUpdateManyWithoutRecipeNestedInput
    bookmarks?: BookmarkUpdateManyWithoutRecipeNestedInput
    tags?: RecipeTagUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeUncheckedUpdateWithoutTriedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    votes?: VoteUncheckedUpdateManyWithoutRecipeNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutRecipeNestedInput
    tags?: RecipeTagUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeCreateManyAuthorInput = {
    id?: string
    name: string
    description: string
    instructions: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VoteCreateManyUserInput = {
    id?: string
    value: number
    createdAt?: Date | string
    recipeId: string
  }

  export type BookmarkCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    recipeId: string
  }

  export type TriedCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    recipeId: string
  }

  export type RecipeUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votes?: VoteUpdateManyWithoutRecipeNestedInput
    bookmarks?: BookmarkUpdateManyWithoutRecipeNestedInput
    tried?: TriedUpdateManyWithoutRecipeNestedInput
    tags?: RecipeTagUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votes?: VoteUncheckedUpdateManyWithoutRecipeNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutRecipeNestedInput
    tried?: TriedUncheckedUpdateManyWithoutRecipeNestedInput
    tags?: RecipeTagUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe?: RecipeUpdateOneRequiredWithoutVotesNestedInput
  }

  export type VoteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeId?: StringFieldUpdateOperationsInput | string
  }

  export type VoteUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeId?: StringFieldUpdateOperationsInput | string
  }

  export type BookmarkUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe?: RecipeUpdateOneRequiredWithoutBookmarksNestedInput
  }

  export type BookmarkUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeId?: StringFieldUpdateOperationsInput | string
  }

  export type BookmarkUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeId?: StringFieldUpdateOperationsInput | string
  }

  export type TriedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe?: RecipeUpdateOneRequiredWithoutTriedNestedInput
  }

  export type TriedUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeId?: StringFieldUpdateOperationsInput | string
  }

  export type TriedUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeId?: StringFieldUpdateOperationsInput | string
  }

  export type VoteCreateManyRecipeInput = {
    id?: string
    value: number
    createdAt?: Date | string
    userId: string
  }

  export type BookmarkCreateManyRecipeInput = {
    id?: string
    createdAt?: Date | string
    userId: string
  }

  export type TriedCreateManyRecipeInput = {
    id?: string
    createdAt?: Date | string
    userId: string
  }

  export type RecipeTagCreateManyRecipeInput = {
    tagId: string
    createdAt?: Date | string
  }

  export type VoteUpdateWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutVotesNestedInput
  }

  export type VoteUncheckedUpdateWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type VoteUncheckedUpdateManyWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type BookmarkUpdateWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookmarksNestedInput
  }

  export type BookmarkUncheckedUpdateWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type BookmarkUncheckedUpdateManyWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TriedUpdateWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTriedNestedInput
  }

  export type TriedUncheckedUpdateWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TriedUncheckedUpdateManyWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type RecipeTagUpdateWithoutRecipeInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tag?: TagUpdateOneRequiredWithoutRecipesNestedInput
  }

  export type RecipeTagUncheckedUpdateWithoutRecipeInput = {
    tagId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeTagUncheckedUpdateManyWithoutRecipeInput = {
    tagId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeTagCreateManyTagInput = {
    recipeId: string
    createdAt?: Date | string
  }

  export type RecipeTagUpdateWithoutTagInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe?: RecipeUpdateOneRequiredWithoutTagsNestedInput
  }

  export type RecipeTagUncheckedUpdateWithoutTagInput = {
    recipeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeTagUncheckedUpdateManyWithoutTagInput = {
    recipeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}