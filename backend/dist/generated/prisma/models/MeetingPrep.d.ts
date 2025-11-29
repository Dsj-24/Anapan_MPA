import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model MeetingPrep
 *
 */
export type MeetingPrepModel = runtime.Types.Result.DefaultSelection<Prisma.$MeetingPrepPayload>;
export type AggregateMeetingPrep = {
    _count: MeetingPrepCountAggregateOutputType | null;
    _avg: MeetingPrepAvgAggregateOutputType | null;
    _sum: MeetingPrepSumAggregateOutputType | null;
    _min: MeetingPrepMinAggregateOutputType | null;
    _max: MeetingPrepMaxAggregateOutputType | null;
};
export type MeetingPrepAvgAggregateOutputType = {
    id: number | null;
};
export type MeetingPrepSumAggregateOutputType = {
    id: number | null;
};
export type MeetingPrepMinAggregateOutputType = {
    id: number | null;
    eventId: string | null;
    fullName: string | null;
    email: string | null;
    company: string | null;
    roleLine: string | null;
    meetingTitle: string | null;
    startTime: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MeetingPrepMaxAggregateOutputType = {
    id: number | null;
    eventId: string | null;
    fullName: string | null;
    email: string | null;
    company: string | null;
    roleLine: string | null;
    meetingTitle: string | null;
    startTime: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MeetingPrepCountAggregateOutputType = {
    id: number;
    eventId: number;
    fullName: number;
    email: number;
    company: number;
    roleLine: number;
    meetingTitle: number;
    startTime: number;
    prepJson: number;
    contextJson: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type MeetingPrepAvgAggregateInputType = {
    id?: true;
};
export type MeetingPrepSumAggregateInputType = {
    id?: true;
};
export type MeetingPrepMinAggregateInputType = {
    id?: true;
    eventId?: true;
    fullName?: true;
    email?: true;
    company?: true;
    roleLine?: true;
    meetingTitle?: true;
    startTime?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MeetingPrepMaxAggregateInputType = {
    id?: true;
    eventId?: true;
    fullName?: true;
    email?: true;
    company?: true;
    roleLine?: true;
    meetingTitle?: true;
    startTime?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MeetingPrepCountAggregateInputType = {
    id?: true;
    eventId?: true;
    fullName?: true;
    email?: true;
    company?: true;
    roleLine?: true;
    meetingTitle?: true;
    startTime?: true;
    prepJson?: true;
    contextJson?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type MeetingPrepAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MeetingPrep to aggregate.
     */
    where?: Prisma.MeetingPrepWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MeetingPreps to fetch.
     */
    orderBy?: Prisma.MeetingPrepOrderByWithRelationInput | Prisma.MeetingPrepOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MeetingPrepWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MeetingPreps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MeetingPreps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MeetingPreps
    **/
    _count?: true | MeetingPrepCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: MeetingPrepAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: MeetingPrepSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MeetingPrepMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MeetingPrepMaxAggregateInputType;
};
export type GetMeetingPrepAggregateType<T extends MeetingPrepAggregateArgs> = {
    [P in keyof T & keyof AggregateMeetingPrep]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMeetingPrep[P]> : Prisma.GetScalarType<T[P], AggregateMeetingPrep[P]>;
};
export type MeetingPrepGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MeetingPrepWhereInput;
    orderBy?: Prisma.MeetingPrepOrderByWithAggregationInput | Prisma.MeetingPrepOrderByWithAggregationInput[];
    by: Prisma.MeetingPrepScalarFieldEnum[] | Prisma.MeetingPrepScalarFieldEnum;
    having?: Prisma.MeetingPrepScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MeetingPrepCountAggregateInputType | true;
    _avg?: MeetingPrepAvgAggregateInputType;
    _sum?: MeetingPrepSumAggregateInputType;
    _min?: MeetingPrepMinAggregateInputType;
    _max?: MeetingPrepMaxAggregateInputType;
};
export type MeetingPrepGroupByOutputType = {
    id: number;
    eventId: string;
    fullName: string;
    email: string | null;
    company: string | null;
    roleLine: string | null;
    meetingTitle: string;
    startTime: Date;
    prepJson: runtime.JsonValue;
    contextJson: runtime.JsonValue;
    createdAt: Date;
    updatedAt: Date;
    _count: MeetingPrepCountAggregateOutputType | null;
    _avg: MeetingPrepAvgAggregateOutputType | null;
    _sum: MeetingPrepSumAggregateOutputType | null;
    _min: MeetingPrepMinAggregateOutputType | null;
    _max: MeetingPrepMaxAggregateOutputType | null;
};
type GetMeetingPrepGroupByPayload<T extends MeetingPrepGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MeetingPrepGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MeetingPrepGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MeetingPrepGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MeetingPrepGroupByOutputType[P]>;
}>>;
export type MeetingPrepWhereInput = {
    AND?: Prisma.MeetingPrepWhereInput | Prisma.MeetingPrepWhereInput[];
    OR?: Prisma.MeetingPrepWhereInput[];
    NOT?: Prisma.MeetingPrepWhereInput | Prisma.MeetingPrepWhereInput[];
    id?: Prisma.IntFilter<"MeetingPrep"> | number;
    eventId?: Prisma.StringFilter<"MeetingPrep"> | string;
    fullName?: Prisma.StringFilter<"MeetingPrep"> | string;
    email?: Prisma.StringNullableFilter<"MeetingPrep"> | string | null;
    company?: Prisma.StringNullableFilter<"MeetingPrep"> | string | null;
    roleLine?: Prisma.StringNullableFilter<"MeetingPrep"> | string | null;
    meetingTitle?: Prisma.StringFilter<"MeetingPrep"> | string;
    startTime?: Prisma.DateTimeFilter<"MeetingPrep"> | Date | string;
    prepJson?: Prisma.JsonFilter<"MeetingPrep">;
    contextJson?: Prisma.JsonFilter<"MeetingPrep">;
    createdAt?: Prisma.DateTimeFilter<"MeetingPrep"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MeetingPrep"> | Date | string;
};
export type MeetingPrepOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    company?: Prisma.SortOrderInput | Prisma.SortOrder;
    roleLine?: Prisma.SortOrderInput | Prisma.SortOrder;
    meetingTitle?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    prepJson?: Prisma.SortOrder;
    contextJson?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MeetingPrepWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    eventId?: string;
    AND?: Prisma.MeetingPrepWhereInput | Prisma.MeetingPrepWhereInput[];
    OR?: Prisma.MeetingPrepWhereInput[];
    NOT?: Prisma.MeetingPrepWhereInput | Prisma.MeetingPrepWhereInput[];
    fullName?: Prisma.StringFilter<"MeetingPrep"> | string;
    email?: Prisma.StringNullableFilter<"MeetingPrep"> | string | null;
    company?: Prisma.StringNullableFilter<"MeetingPrep"> | string | null;
    roleLine?: Prisma.StringNullableFilter<"MeetingPrep"> | string | null;
    meetingTitle?: Prisma.StringFilter<"MeetingPrep"> | string;
    startTime?: Prisma.DateTimeFilter<"MeetingPrep"> | Date | string;
    prepJson?: Prisma.JsonFilter<"MeetingPrep">;
    contextJson?: Prisma.JsonFilter<"MeetingPrep">;
    createdAt?: Prisma.DateTimeFilter<"MeetingPrep"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MeetingPrep"> | Date | string;
}, "id" | "eventId">;
export type MeetingPrepOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    company?: Prisma.SortOrderInput | Prisma.SortOrder;
    roleLine?: Prisma.SortOrderInput | Prisma.SortOrder;
    meetingTitle?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    prepJson?: Prisma.SortOrder;
    contextJson?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.MeetingPrepCountOrderByAggregateInput;
    _avg?: Prisma.MeetingPrepAvgOrderByAggregateInput;
    _max?: Prisma.MeetingPrepMaxOrderByAggregateInput;
    _min?: Prisma.MeetingPrepMinOrderByAggregateInput;
    _sum?: Prisma.MeetingPrepSumOrderByAggregateInput;
};
export type MeetingPrepScalarWhereWithAggregatesInput = {
    AND?: Prisma.MeetingPrepScalarWhereWithAggregatesInput | Prisma.MeetingPrepScalarWhereWithAggregatesInput[];
    OR?: Prisma.MeetingPrepScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MeetingPrepScalarWhereWithAggregatesInput | Prisma.MeetingPrepScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"MeetingPrep"> | number;
    eventId?: Prisma.StringWithAggregatesFilter<"MeetingPrep"> | string;
    fullName?: Prisma.StringWithAggregatesFilter<"MeetingPrep"> | string;
    email?: Prisma.StringNullableWithAggregatesFilter<"MeetingPrep"> | string | null;
    company?: Prisma.StringNullableWithAggregatesFilter<"MeetingPrep"> | string | null;
    roleLine?: Prisma.StringNullableWithAggregatesFilter<"MeetingPrep"> | string | null;
    meetingTitle?: Prisma.StringWithAggregatesFilter<"MeetingPrep"> | string;
    startTime?: Prisma.DateTimeWithAggregatesFilter<"MeetingPrep"> | Date | string;
    prepJson?: Prisma.JsonWithAggregatesFilter<"MeetingPrep">;
    contextJson?: Prisma.JsonWithAggregatesFilter<"MeetingPrep">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MeetingPrep"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"MeetingPrep"> | Date | string;
};
export type MeetingPrepCreateInput = {
    eventId: string;
    fullName: string;
    email?: string | null;
    company?: string | null;
    roleLine?: string | null;
    meetingTitle: string;
    startTime: Date | string;
    prepJson: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    contextJson: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MeetingPrepUncheckedCreateInput = {
    id?: number;
    eventId: string;
    fullName: string;
    email?: string | null;
    company?: string | null;
    roleLine?: string | null;
    meetingTitle: string;
    startTime: Date | string;
    prepJson: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    contextJson: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MeetingPrepUpdateInput = {
    eventId?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    company?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roleLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    meetingTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prepJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    contextJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MeetingPrepUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    eventId?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    company?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roleLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    meetingTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prepJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    contextJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MeetingPrepCreateManyInput = {
    id?: number;
    eventId: string;
    fullName: string;
    email?: string | null;
    company?: string | null;
    roleLine?: string | null;
    meetingTitle: string;
    startTime: Date | string;
    prepJson: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    contextJson: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MeetingPrepUpdateManyMutationInput = {
    eventId?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    company?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roleLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    meetingTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prepJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    contextJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MeetingPrepUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    eventId?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    company?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roleLine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    meetingTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prepJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    contextJson?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MeetingPrepCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    roleLine?: Prisma.SortOrder;
    meetingTitle?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    prepJson?: Prisma.SortOrder;
    contextJson?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MeetingPrepAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type MeetingPrepMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    roleLine?: Prisma.SortOrder;
    meetingTitle?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MeetingPrepMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    roleLine?: Prisma.SortOrder;
    meetingTitle?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MeetingPrepSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type MeetingPrepSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    eventId?: boolean;
    fullName?: boolean;
    email?: boolean;
    company?: boolean;
    roleLine?: boolean;
    meetingTitle?: boolean;
    startTime?: boolean;
    prepJson?: boolean;
    contextJson?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["meetingPrep"]>;
export type MeetingPrepSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    eventId?: boolean;
    fullName?: boolean;
    email?: boolean;
    company?: boolean;
    roleLine?: boolean;
    meetingTitle?: boolean;
    startTime?: boolean;
    prepJson?: boolean;
    contextJson?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["meetingPrep"]>;
export type MeetingPrepSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    eventId?: boolean;
    fullName?: boolean;
    email?: boolean;
    company?: boolean;
    roleLine?: boolean;
    meetingTitle?: boolean;
    startTime?: boolean;
    prepJson?: boolean;
    contextJson?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["meetingPrep"]>;
export type MeetingPrepSelectScalar = {
    id?: boolean;
    eventId?: boolean;
    fullName?: boolean;
    email?: boolean;
    company?: boolean;
    roleLine?: boolean;
    meetingTitle?: boolean;
    startTime?: boolean;
    prepJson?: boolean;
    contextJson?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type MeetingPrepOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "eventId" | "fullName" | "email" | "company" | "roleLine" | "meetingTitle" | "startTime" | "prepJson" | "contextJson" | "createdAt" | "updatedAt", ExtArgs["result"]["meetingPrep"]>;
export type $MeetingPrepPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MeetingPrep";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        eventId: string;
        fullName: string;
        email: string | null;
        company: string | null;
        roleLine: string | null;
        meetingTitle: string;
        startTime: Date;
        prepJson: runtime.JsonValue;
        contextJson: runtime.JsonValue;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["meetingPrep"]>;
    composites: {};
};
export type MeetingPrepGetPayload<S extends boolean | null | undefined | MeetingPrepDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MeetingPrepPayload, S>;
export type MeetingPrepCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MeetingPrepFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MeetingPrepCountAggregateInputType | true;
};
export interface MeetingPrepDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MeetingPrep'];
        meta: {
            name: 'MeetingPrep';
        };
    };
    /**
     * Find zero or one MeetingPrep that matches the filter.
     * @param {MeetingPrepFindUniqueArgs} args - Arguments to find a MeetingPrep
     * @example
     * // Get one MeetingPrep
     * const meetingPrep = await prisma.meetingPrep.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MeetingPrepFindUniqueArgs>(args: Prisma.SelectSubset<T, MeetingPrepFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MeetingPrepClient<runtime.Types.Result.GetResult<Prisma.$MeetingPrepPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one MeetingPrep that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MeetingPrepFindUniqueOrThrowArgs} args - Arguments to find a MeetingPrep
     * @example
     * // Get one MeetingPrep
     * const meetingPrep = await prisma.meetingPrep.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MeetingPrepFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MeetingPrepFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MeetingPrepClient<runtime.Types.Result.GetResult<Prisma.$MeetingPrepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MeetingPrep that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingPrepFindFirstArgs} args - Arguments to find a MeetingPrep
     * @example
     * // Get one MeetingPrep
     * const meetingPrep = await prisma.meetingPrep.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MeetingPrepFindFirstArgs>(args?: Prisma.SelectSubset<T, MeetingPrepFindFirstArgs<ExtArgs>>): Prisma.Prisma__MeetingPrepClient<runtime.Types.Result.GetResult<Prisma.$MeetingPrepPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MeetingPrep that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingPrepFindFirstOrThrowArgs} args - Arguments to find a MeetingPrep
     * @example
     * // Get one MeetingPrep
     * const meetingPrep = await prisma.meetingPrep.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MeetingPrepFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MeetingPrepFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MeetingPrepClient<runtime.Types.Result.GetResult<Prisma.$MeetingPrepPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more MeetingPreps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingPrepFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MeetingPreps
     * const meetingPreps = await prisma.meetingPrep.findMany()
     *
     * // Get first 10 MeetingPreps
     * const meetingPreps = await prisma.meetingPrep.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const meetingPrepWithIdOnly = await prisma.meetingPrep.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MeetingPrepFindManyArgs>(args?: Prisma.SelectSubset<T, MeetingPrepFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MeetingPrepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a MeetingPrep.
     * @param {MeetingPrepCreateArgs} args - Arguments to create a MeetingPrep.
     * @example
     * // Create one MeetingPrep
     * const MeetingPrep = await prisma.meetingPrep.create({
     *   data: {
     *     // ... data to create a MeetingPrep
     *   }
     * })
     *
     */
    create<T extends MeetingPrepCreateArgs>(args: Prisma.SelectSubset<T, MeetingPrepCreateArgs<ExtArgs>>): Prisma.Prisma__MeetingPrepClient<runtime.Types.Result.GetResult<Prisma.$MeetingPrepPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many MeetingPreps.
     * @param {MeetingPrepCreateManyArgs} args - Arguments to create many MeetingPreps.
     * @example
     * // Create many MeetingPreps
     * const meetingPrep = await prisma.meetingPrep.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MeetingPrepCreateManyArgs>(args?: Prisma.SelectSubset<T, MeetingPrepCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many MeetingPreps and returns the data saved in the database.
     * @param {MeetingPrepCreateManyAndReturnArgs} args - Arguments to create many MeetingPreps.
     * @example
     * // Create many MeetingPreps
     * const meetingPrep = await prisma.meetingPrep.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MeetingPreps and only return the `id`
     * const meetingPrepWithIdOnly = await prisma.meetingPrep.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MeetingPrepCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MeetingPrepCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MeetingPrepPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a MeetingPrep.
     * @param {MeetingPrepDeleteArgs} args - Arguments to delete one MeetingPrep.
     * @example
     * // Delete one MeetingPrep
     * const MeetingPrep = await prisma.meetingPrep.delete({
     *   where: {
     *     // ... filter to delete one MeetingPrep
     *   }
     * })
     *
     */
    delete<T extends MeetingPrepDeleteArgs>(args: Prisma.SelectSubset<T, MeetingPrepDeleteArgs<ExtArgs>>): Prisma.Prisma__MeetingPrepClient<runtime.Types.Result.GetResult<Prisma.$MeetingPrepPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one MeetingPrep.
     * @param {MeetingPrepUpdateArgs} args - Arguments to update one MeetingPrep.
     * @example
     * // Update one MeetingPrep
     * const meetingPrep = await prisma.meetingPrep.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MeetingPrepUpdateArgs>(args: Prisma.SelectSubset<T, MeetingPrepUpdateArgs<ExtArgs>>): Prisma.Prisma__MeetingPrepClient<runtime.Types.Result.GetResult<Prisma.$MeetingPrepPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more MeetingPreps.
     * @param {MeetingPrepDeleteManyArgs} args - Arguments to filter MeetingPreps to delete.
     * @example
     * // Delete a few MeetingPreps
     * const { count } = await prisma.meetingPrep.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MeetingPrepDeleteManyArgs>(args?: Prisma.SelectSubset<T, MeetingPrepDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MeetingPreps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingPrepUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MeetingPreps
     * const meetingPrep = await prisma.meetingPrep.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MeetingPrepUpdateManyArgs>(args: Prisma.SelectSubset<T, MeetingPrepUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MeetingPreps and returns the data updated in the database.
     * @param {MeetingPrepUpdateManyAndReturnArgs} args - Arguments to update many MeetingPreps.
     * @example
     * // Update many MeetingPreps
     * const meetingPrep = await prisma.meetingPrep.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MeetingPreps and only return the `id`
     * const meetingPrepWithIdOnly = await prisma.meetingPrep.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends MeetingPrepUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MeetingPrepUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MeetingPrepPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one MeetingPrep.
     * @param {MeetingPrepUpsertArgs} args - Arguments to update or create a MeetingPrep.
     * @example
     * // Update or create a MeetingPrep
     * const meetingPrep = await prisma.meetingPrep.upsert({
     *   create: {
     *     // ... data to create a MeetingPrep
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MeetingPrep we want to update
     *   }
     * })
     */
    upsert<T extends MeetingPrepUpsertArgs>(args: Prisma.SelectSubset<T, MeetingPrepUpsertArgs<ExtArgs>>): Prisma.Prisma__MeetingPrepClient<runtime.Types.Result.GetResult<Prisma.$MeetingPrepPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of MeetingPreps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingPrepCountArgs} args - Arguments to filter MeetingPreps to count.
     * @example
     * // Count the number of MeetingPreps
     * const count = await prisma.meetingPrep.count({
     *   where: {
     *     // ... the filter for the MeetingPreps we want to count
     *   }
     * })
    **/
    count<T extends MeetingPrepCountArgs>(args?: Prisma.Subset<T, MeetingPrepCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MeetingPrepCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a MeetingPrep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingPrepAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MeetingPrepAggregateArgs>(args: Prisma.Subset<T, MeetingPrepAggregateArgs>): Prisma.PrismaPromise<GetMeetingPrepAggregateType<T>>;
    /**
     * Group by MeetingPrep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingPrepGroupByArgs} args - Group by arguments.
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
    groupBy<T extends MeetingPrepGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MeetingPrepGroupByArgs['orderBy'];
    } : {
        orderBy?: MeetingPrepGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MeetingPrepGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMeetingPrepGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MeetingPrep model
     */
    readonly fields: MeetingPrepFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for MeetingPrep.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MeetingPrepClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the MeetingPrep model
 */
export interface MeetingPrepFieldRefs {
    readonly id: Prisma.FieldRef<"MeetingPrep", 'Int'>;
    readonly eventId: Prisma.FieldRef<"MeetingPrep", 'String'>;
    readonly fullName: Prisma.FieldRef<"MeetingPrep", 'String'>;
    readonly email: Prisma.FieldRef<"MeetingPrep", 'String'>;
    readonly company: Prisma.FieldRef<"MeetingPrep", 'String'>;
    readonly roleLine: Prisma.FieldRef<"MeetingPrep", 'String'>;
    readonly meetingTitle: Prisma.FieldRef<"MeetingPrep", 'String'>;
    readonly startTime: Prisma.FieldRef<"MeetingPrep", 'DateTime'>;
    readonly prepJson: Prisma.FieldRef<"MeetingPrep", 'Json'>;
    readonly contextJson: Prisma.FieldRef<"MeetingPrep", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"MeetingPrep", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"MeetingPrep", 'DateTime'>;
}
/**
 * MeetingPrep findUnique
 */
export type MeetingPrepFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingPrep
     */
    select?: Prisma.MeetingPrepSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingPrep
     */
    omit?: Prisma.MeetingPrepOmit<ExtArgs> | null;
    /**
     * Filter, which MeetingPrep to fetch.
     */
    where: Prisma.MeetingPrepWhereUniqueInput;
};
/**
 * MeetingPrep findUniqueOrThrow
 */
export type MeetingPrepFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingPrep
     */
    select?: Prisma.MeetingPrepSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingPrep
     */
    omit?: Prisma.MeetingPrepOmit<ExtArgs> | null;
    /**
     * Filter, which MeetingPrep to fetch.
     */
    where: Prisma.MeetingPrepWhereUniqueInput;
};
/**
 * MeetingPrep findFirst
 */
export type MeetingPrepFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingPrep
     */
    select?: Prisma.MeetingPrepSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingPrep
     */
    omit?: Prisma.MeetingPrepOmit<ExtArgs> | null;
    /**
     * Filter, which MeetingPrep to fetch.
     */
    where?: Prisma.MeetingPrepWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MeetingPreps to fetch.
     */
    orderBy?: Prisma.MeetingPrepOrderByWithRelationInput | Prisma.MeetingPrepOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MeetingPreps.
     */
    cursor?: Prisma.MeetingPrepWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MeetingPreps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MeetingPreps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MeetingPreps.
     */
    distinct?: Prisma.MeetingPrepScalarFieldEnum | Prisma.MeetingPrepScalarFieldEnum[];
};
/**
 * MeetingPrep findFirstOrThrow
 */
export type MeetingPrepFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingPrep
     */
    select?: Prisma.MeetingPrepSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingPrep
     */
    omit?: Prisma.MeetingPrepOmit<ExtArgs> | null;
    /**
     * Filter, which MeetingPrep to fetch.
     */
    where?: Prisma.MeetingPrepWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MeetingPreps to fetch.
     */
    orderBy?: Prisma.MeetingPrepOrderByWithRelationInput | Prisma.MeetingPrepOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MeetingPreps.
     */
    cursor?: Prisma.MeetingPrepWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MeetingPreps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MeetingPreps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MeetingPreps.
     */
    distinct?: Prisma.MeetingPrepScalarFieldEnum | Prisma.MeetingPrepScalarFieldEnum[];
};
/**
 * MeetingPrep findMany
 */
export type MeetingPrepFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingPrep
     */
    select?: Prisma.MeetingPrepSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingPrep
     */
    omit?: Prisma.MeetingPrepOmit<ExtArgs> | null;
    /**
     * Filter, which MeetingPreps to fetch.
     */
    where?: Prisma.MeetingPrepWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MeetingPreps to fetch.
     */
    orderBy?: Prisma.MeetingPrepOrderByWithRelationInput | Prisma.MeetingPrepOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MeetingPreps.
     */
    cursor?: Prisma.MeetingPrepWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MeetingPreps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MeetingPreps.
     */
    skip?: number;
    distinct?: Prisma.MeetingPrepScalarFieldEnum | Prisma.MeetingPrepScalarFieldEnum[];
};
/**
 * MeetingPrep create
 */
export type MeetingPrepCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingPrep
     */
    select?: Prisma.MeetingPrepSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingPrep
     */
    omit?: Prisma.MeetingPrepOmit<ExtArgs> | null;
    /**
     * The data needed to create a MeetingPrep.
     */
    data: Prisma.XOR<Prisma.MeetingPrepCreateInput, Prisma.MeetingPrepUncheckedCreateInput>;
};
/**
 * MeetingPrep createMany
 */
export type MeetingPrepCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many MeetingPreps.
     */
    data: Prisma.MeetingPrepCreateManyInput | Prisma.MeetingPrepCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MeetingPrep createManyAndReturn
 */
export type MeetingPrepCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingPrep
     */
    select?: Prisma.MeetingPrepSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingPrep
     */
    omit?: Prisma.MeetingPrepOmit<ExtArgs> | null;
    /**
     * The data used to create many MeetingPreps.
     */
    data: Prisma.MeetingPrepCreateManyInput | Prisma.MeetingPrepCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MeetingPrep update
 */
export type MeetingPrepUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingPrep
     */
    select?: Prisma.MeetingPrepSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingPrep
     */
    omit?: Prisma.MeetingPrepOmit<ExtArgs> | null;
    /**
     * The data needed to update a MeetingPrep.
     */
    data: Prisma.XOR<Prisma.MeetingPrepUpdateInput, Prisma.MeetingPrepUncheckedUpdateInput>;
    /**
     * Choose, which MeetingPrep to update.
     */
    where: Prisma.MeetingPrepWhereUniqueInput;
};
/**
 * MeetingPrep updateMany
 */
export type MeetingPrepUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update MeetingPreps.
     */
    data: Prisma.XOR<Prisma.MeetingPrepUpdateManyMutationInput, Prisma.MeetingPrepUncheckedUpdateManyInput>;
    /**
     * Filter which MeetingPreps to update
     */
    where?: Prisma.MeetingPrepWhereInput;
    /**
     * Limit how many MeetingPreps to update.
     */
    limit?: number;
};
/**
 * MeetingPrep updateManyAndReturn
 */
export type MeetingPrepUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingPrep
     */
    select?: Prisma.MeetingPrepSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingPrep
     */
    omit?: Prisma.MeetingPrepOmit<ExtArgs> | null;
    /**
     * The data used to update MeetingPreps.
     */
    data: Prisma.XOR<Prisma.MeetingPrepUpdateManyMutationInput, Prisma.MeetingPrepUncheckedUpdateManyInput>;
    /**
     * Filter which MeetingPreps to update
     */
    where?: Prisma.MeetingPrepWhereInput;
    /**
     * Limit how many MeetingPreps to update.
     */
    limit?: number;
};
/**
 * MeetingPrep upsert
 */
export type MeetingPrepUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingPrep
     */
    select?: Prisma.MeetingPrepSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingPrep
     */
    omit?: Prisma.MeetingPrepOmit<ExtArgs> | null;
    /**
     * The filter to search for the MeetingPrep to update in case it exists.
     */
    where: Prisma.MeetingPrepWhereUniqueInput;
    /**
     * In case the MeetingPrep found by the `where` argument doesn't exist, create a new MeetingPrep with this data.
     */
    create: Prisma.XOR<Prisma.MeetingPrepCreateInput, Prisma.MeetingPrepUncheckedCreateInput>;
    /**
     * In case the MeetingPrep was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MeetingPrepUpdateInput, Prisma.MeetingPrepUncheckedUpdateInput>;
};
/**
 * MeetingPrep delete
 */
export type MeetingPrepDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingPrep
     */
    select?: Prisma.MeetingPrepSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingPrep
     */
    omit?: Prisma.MeetingPrepOmit<ExtArgs> | null;
    /**
     * Filter which MeetingPrep to delete.
     */
    where: Prisma.MeetingPrepWhereUniqueInput;
};
/**
 * MeetingPrep deleteMany
 */
export type MeetingPrepDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MeetingPreps to delete
     */
    where?: Prisma.MeetingPrepWhereInput;
    /**
     * Limit how many MeetingPreps to delete.
     */
    limit?: number;
};
/**
 * MeetingPrep without action
 */
export type MeetingPrepDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingPrep
     */
    select?: Prisma.MeetingPrepSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingPrep
     */
    omit?: Prisma.MeetingPrepOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=MeetingPrep.d.ts.map